import { getRepository } from "typeorm";
import { Device } from "../entity/device";
import { Room } from "../entity/room";

/*export const addDevice= async(device:Device)=>{
    const newDevice = await getRepository(Device).create(device);
    return await getRepository(Device).save(newDevice);
}*/

export const addDevice = async (device: Device) => {
	let id = await generateDeviceId();
	return await getRepository(Device)
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

export const getUnasignedDevices = async () => {
	return await getRepository(Device)
		.createQueryBuilder("device")
		.where("device.room IS NULL")
		.printSql()
		.getMany();
};

export const getDeviceState = async (device: string) => {
	return await getRepository(Device)
		.createQueryBuilder("device")
		.where("device.id = :id", { id: device })
		.printSql()
		.getOne();
};

export const addRoom = async (room: string) => {
	let id = await generateDeviceId();
	return await getRepository(Room)
		.createQueryBuilder()
		.insert()
		.values({
			name: room,
		})
		.execute();
};

export const updateRoom = async (room: string, newroom: string) => {
	let id = await generateDeviceId();
	return await getRepository(Room)
		.createQueryBuilder("room")
		.update(Room)
		.set({ name: newroom })
		.where("room.name = :name", { name: room })
		.execute();
};

export const deleteRoom = async (room: string) => {
	let id = await generateDeviceId();
	return await getRepository(Room)
		.createQueryBuilder("room")
		.delete()
		.where("room.name = :name", { name: room })
		.execute();
};

export const getRooms = async () => {
	return await getRepository(Room)
		.createQueryBuilder("room")
		.printSql()
		.getMany();
};

export const getRoom = async (room: string) => {
	return await getRepository(Room)
		.createQueryBuilder("room")
		.where("room.id = :id", { id: room })
		.printSql()
		.getOne();
};

export const asignDeviceToRoom = async (room: Room, device: string) => {
	return await getRepository(Device)
		.createQueryBuilder("device")
		.update(Device)
		.set({ room: room })
		.where("device.id = :id", { id: device })
		.printSql()
		.execute();
};

export const unasignDevice = async (device: string) => {
	return await getRepository(Device)
		.createQueryBuilder("device")
		.update(Device)
		.set({ room: null })
		.where("device.id = :id", { id: device })
		.printSql()
		.execute();
};

async function generateDeviceId(): Promise<string> {
	let cadena: string = "";
	for (let i = 0; i < 3; i += 1)
		cadena += String.fromCharCode(97 + Math.random() * 25);

	const user = await getRepository(Device)
		.createQueryBuilder("device")
		.where("device.id = :id", { id: cadena })
		.getOne();

	if (user == null) return cadena.toUpperCase();
	else return generateDeviceId();
}
