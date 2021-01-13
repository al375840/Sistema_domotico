import { Connection, getRepository, Repository } from "typeorm";
import { Device } from "../entity/device";
import { Room } from "../entity/room";
import { updateState } from "../others/i-update-state";
import { IController } from "./icontroller";

export class Controller implements IController {
	deviceRepository: Repository<Device>;
	roomRepository: Repository<Room>;
	constructor(c: Connection) {
		this.deviceRepository = c.getRepository(Device);
		this.roomRepository = c.getRepository(Room);
	}
	async updateDevicesState(us: updateState): Promise<number> {
		let changes = 0;

		for (let d of us.toAdd) {
			await this.addDevice(d);
			changes += 1;
		}

		for (let d of us.toUpdate) {
			await this.updateDevice(d);
			changes += 1;
		}

		if (us.toDelete.length > 0) {
			await this.deviceRepository
				.createQueryBuilder("device")
				.delete()
				.where("device.id IN (:...ids)", { ids: us.toDelete.map((d) => d.id) })
				.execute()
				.then((res) => (changes += res.affected || 0));
		}

		return changes;
	}
	private addDevice(device: Device) {
		return this.deviceRepository
			.createQueryBuilder()
			.insert()
			.values({
				id: device.id,
				type: device.type,
				state: device.state,
				turned: device.turned,
			})
			.execute();
	}

	async getUnasignedDevices(): Promise<Device[] | undefined> {
		try {
			return this.deviceRepository
				.createQueryBuilder("device")
				.where("device.room IS NULL")
				.getMany();
		} catch (e) {
			console.error(e);
			return undefined;
		}
	}

	getDeviceState(device: string): Promise<Device | undefined> {
		return this.deviceRepository
			.createQueryBuilder("device")
			.where("device.id = :id", { id: device })
			.getOne();
	}

	async addRoom(room: string): Promise<boolean> {
		let done = true;
		await this.roomRepository
			.createQueryBuilder()
			.insert()
			.values({
				name: room,
			})
			.execute()
			.catch((e) => {
				console.error(e);
				done = false;
			});
		return done;
	}
	async setDevicesState(devices: Device[]): Promise<number> {
		let changes = 0;
		//Primero se quitan los dispositivos residuales de otros hubs, si no hay ninguno se borran todos
		if (devices.length > 0) {
			await this.deviceRepository
				.createQueryBuilder("device")
				.delete()
				.where("device.id NOT IN (:...ids)", { ids: devices.map((d) => d.id) })
				.execute()
				.then((res) => (changes += res.affected || 0));

			let localDevices = await this.deviceRepository
				.createQueryBuilder()
				.getMany();

			for (let device of devices) {
				let ld = localDevices.find((d) => d.id == device.id);
				if (ld) {
					if (ld.state != device.state || ld?.turned != device.turned) {
						await this.updateDevice(device);
						changes += 1;
					}
				} else {
					await this.addDevice(device);
					changes += 1;
				}
			}
		} else {
			await this.deviceRepository
				.createQueryBuilder("device")
				.delete()
				.execute()
				.then((res) => (changes += res.affected || 0));
		}
		return changes;
	}

	async alarmsToTriggerOn(): Promise<Device[]> {
		let rwad = this.roomRepository
			.createQueryBuilder("room")
			.select("room.name")
			.leftJoin("room.devices", "device")
			.where("device.turned = :turned", { turned: false })
			.orWhere("device.state IN (:...states)", {
				states: ["MOTION_DETECTED", "OPEN"],
			});

		return this.deviceRepository
			.createQueryBuilder("device")
			.leftJoin("device.room", "r")
			.where("device.type = :type", { type: "alarma" })
			.andWhere("device.state = :s", { s: "OFF" })
			.andWhere("device.turned = :t", { t: true })
			.andWhere("r.name IN (" + rwad.getQuery() + ")")
			.setParameters(rwad.getParameters())
			.getMany();
	}

	async alarmsToTriggerOff(): Promise<Device[]> {
		let rwad = this.roomRepository
			.createQueryBuilder("room")
			.select("room.name")
			.leftJoin("room.devices", "device")
			.where("device.turned = :turned", { turned: false })
			.orWhere("device.state IN (:...states)", {
				states: ["MOTION_DETECTED", "OPEN"],
			});

		return this.deviceRepository
			.createQueryBuilder("device")
			.where("device.type = :type", { type: "alarma" })
			.andWhere("device.state = :s", { s: "ON" })
			.andWhere("device.turned = :t", { t: true })
			.andWhere(
				`(device.room IS NULL OR device.room NOT IN (${rwad.getQuery()}))`
			)
			.setParameters(rwad.getParameters())
			.getMany();
	}

	private async updateDevice(device: Device): Promise<number> {
		let res = 0;
		await this.deviceRepository
			.createQueryBuilder("device")
			.update(Device)
			.set({ state: device.state, turned: device.turned })
			.where("device.id = :id", { id: device.id })
			.execute()
			.then((n) => (res = n.affected || 0))
			.catch((e) => {
				console.error(e);
				res = -1;
			});
		return res;
	}

	async updateRoom(room: string, newroom: string): Promise<number> {
		let res = 0;
		await this.roomRepository
			.createQueryBuilder("room")
			.update(Room)
			.set({ name: newroom })
			.where("room.name = :name", { name: room })
			.execute()
			.then((n) => (res = n.affected || 0))
			.catch((e) => {
				console.error(e);
				res = -1;
			});
		return res;
	}

	async deleteRoom(room: string): Promise<number> {
		let res = 0;
		await this.roomRepository
			.createQueryBuilder("room")
			.delete()
			.where("room.name = :name", { name: room })
			.execute()
			.then((r) => (res = r.affected || 0))
			.catch((e) => {
				console.error(e);
				res = -1;
			});
		return res;
	}

	getRooms(): Promise<Room[] | undefined> {
		return this.roomRepository
			.createQueryBuilder("room")
			.leftJoinAndSelect("room.devices", "device")
			.getMany()
			.catch((e) => {
				console.error(e);
				return undefined;
			});
	}

	getRoom(room: string): Promise<Room | undefined> {
		return this.roomRepository
			.createQueryBuilder("room")
			.leftJoinAndSelect("room.devices", "device")
			.where("room.name = :name", { name: room })
			.getOne();
	}

	async asignDeviceToRoom(room: Room, device: string): Promise<number> {
		let res = 0;
		await this.deviceRepository
			.createQueryBuilder()
			.update(Device)
			.set({ room: room })
			.where("device.id = :id", { id: device })
			.execute()
			.then((n) => (res = n.affected || 0))
			.catch((e) => {
				console.error(e);
				res = -1;
			});
		return res;
	}

	async unasignDevice(device: string): Promise<number> {
		let res = 0;
		await this.deviceRepository
			.createQueryBuilder()
			.update(Device)
			.set({ room: undefined })
			.where("device.id = :id", { id: device })
			.execute()
			.then((n) => (res = n.affected || 0))
			.catch((e) => {
				console.error(e);
				res = -1;
			});
		return res;
	}
}
