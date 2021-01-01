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
		return this.deviceRepository
			.createQueryBuilder()
			.insert()
			.values({
				id: device.id,
				type: device.type,
				state: device.state,
				turned: device.turned
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
	updateState = async (devices: Device[]) => {
		let changes = 0;
		//Primero se quitan los dispositivos residuales de otros hubs, si no hay ninguno se borran todos
		if (devices.length > 0) {
			await this.deviceRepository
				.createQueryBuilder("device")
				.delete()
				.where("device.id NOT IN (:...ids)", { ids: devices.map((d) => d.id) })
				.execute().then(res =>changes += res.affected||0 );

			let localDevices = 
				await this.deviceRepository.createQueryBuilder().getMany();

			for (let device of devices) {
				let ld = localDevices.find((d)=>d.id == device.id)
				if (ld) {
					if(ld.state != device.state || ld?.turned != device.turned){
						await this.updateDevice(device);
						changes+=1;
					}
				} else {
					await this.addDevice(device);
					changes+=1;
				}
			}
		} else {
			await this.deviceRepository
				.createQueryBuilder("device")
				.delete()
				.execute().then(res =>changes += res.affected||0 );
		}
		return changes
	};
	
	alarmsToTriggerOn = async()=>{
		let rwad=this.roomRepository
			.createQueryBuilder("room")
			.select("room.name")
			.leftJoin("room.devices", "device")
			.where("device.turned = :turned",{turned:false})
			.orWhere("device.state IN (:...states)",{states:["MOTION_DETECTED","OPEN"]});

		return this.deviceRepository
		.createQueryBuilder("device")
		.leftJoin("device.room", "r")
		.where("device.type = :type",{type:"alarma"})
		.andWhere("device.state = :s", {s:"OFF"})
		.andWhere("r.name IN ("+rwad.getQuery()+")")
		.setParameters(rwad.getParameters())
		.getMany()
		
	}

	alarmsToTriggerOff = async()=>{
		let rwad=this.roomRepository
			.createQueryBuilder("room")
			.select("room.name")
			.leftJoin("room.devices", "device")
			.where("device.turned = :turned",{turned:false})
			.orWhere("device.state IN (:...states)",{states:["MOTION_DETECTED","OPEN"]});

		return this.deviceRepository
		.createQueryBuilder("device")
		.leftJoin("device.room", "r")
		.where("device.type = :type",{type:"alarma"})
		.andWhere("device.state = :s", {s:"ON"})
		.andWhere("r.name NOT IN ("+rwad.getQuery()+")")
		.setParameters(rwad.getParameters())
		.getMany()
	}

	updateDevice = async(device:Device)=>{
		return this.deviceRepository
		.createQueryBuilder("device")
		.update(Device)
		.set({state:device.state, turned:device.turned})
		.where("device.id = :id",{id:device.id})
		.execute();
	}

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
}
