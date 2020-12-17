import { Connection, getRepository, Repository } from "typeorm";
import { Device } from "../entity/device";
import { Room } from "../entity/room";

/*export const addDevice= async(device:Device)=>{
    const newDevice = await this.deviceRepository.create(device);
    return await this.deviceRepository.save(newDevice);
}*/

export class Controller {
	deviceRepository: Repository<Device>;
	roomRepository: Repository<Room>;
	constructor(c:Connection) {
		this.deviceRepository = c.getRepository(Device);
		this.roomRepository = c.getRepository(Room);
	}
	addDevice = async (device: Device) => {
		let id = await this.generateDeviceId();
		return this.deviceRepository
			.createQueryBuilder()
			.insert()
			.values({
				id: id,
				type: device.type,
				state: device.state,
				turned: device.turned,
				room: device.room,
			})
			.execute();
	};

	getUnasignedDevices = () => {
		return this.deviceRepository
			.createQueryBuilder("device")
			.where("device.room IS NULL")
			.getMany();
	};

	getDeviceState = (device: string) => {
		return this.deviceRepository
			.createQueryBuilder("device")
			.where("device.id = :id", { id: device })
			.getOne();
	};

	addRoom = (room: string) => {
		return this.roomRepository
			.createQueryBuilder()
			.insert()
			.values({
				name: room,
			})
			.execute();
	};

	updateRoom = (room: string, newroom: string) => {
		return this.roomRepository
			.createQueryBuilder("room")
			.update(Room)
			.set({ name: newroom })
			.where("room.name = :name", { name: room })
			.execute();
	};

	deleteRoom = (room: string) => {
		return this.roomRepository
			.createQueryBuilder("room")
			.delete()
			.where("room.name = :name", { name: room })
			.execute();
	};

	getRooms = () => {
		return this.roomRepository
			.createQueryBuilder("room")
			.leftJoinAndSelect("room.devices", "device")
			.getMany();
	};

	getRoom = (room: string) => {
		return this.roomRepository
			.createQueryBuilder("room")
			.leftJoinAndSelect("room.devices", "device")
			.where("room.name = :name", { name: room })
			.getOne();
	};

	asignDeviceToRoom = (room: Room, device: string) => {
		return this.deviceRepository
			.createQueryBuilder()
			.update(Device)
			.set({ room: room })
			.where("device.id = :id", { id: device })
			.execute();
	};

	unasignDevice = (device: string) => {
		return this.deviceRepository
			.createQueryBuilder()
			.update(Device)
			.set({ room: undefined })
			.where("device.id = :id", { id: device })
			.execute();
	};

	private async generateDeviceId(): Promise<string> {
		let cadena: string = "";
		for (let i = 0; i < 3; i += 1)
			cadena += String.fromCharCode(97 + Math.random() * 25);

		const user = await this.deviceRepository
			.createQueryBuilder("device")
			.where("device.id = :id", { id: cadena })
			.getOne();

		if (user == null) return cadena.toUpperCase();
		else {
			console.log("ID REPETIDA");
			return this.generateDeviceId();
		}
	}
}
