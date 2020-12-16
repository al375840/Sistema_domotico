"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unasignDevice = exports.asignDeviceToRoom = exports.getRoom = exports.getRooms = exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getDeviceState = exports.getUnasignedDevices = exports.addDevice = void 0;
const typeorm_1 = require("typeorm");
const device_1 = require("../entity/device");
const room_1 = require("../entity/room");
/*export const addDevice= async(device:Device)=>{
    const newDevice = await getRepository(Device).create(device);
    return await getRepository(Device).save(newDevice);
}*/
exports.addDevice = async (device) => {
    let id = await generateDeviceId();
    return await typeorm_1.getRepository(device_1.Device)
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
exports.getUnasignedDevices = async () => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.room IS NULL")
        .getMany();
};
exports.getDeviceState = async (device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.id = :id", { id: device })
        .getOne();
};
exports.addRoom = async (room) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder()
        .insert()
        .values({
        name: room,
    })
        .execute();
};
exports.updateRoom = async (room, newroom) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .update(room_1.Room)
        .set({ name: newroom })
        .where("room.name = :name", { name: room })
        .execute();
};
exports.deleteRoom = async (room) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .delete()
        .where("room.name = :name", { name: room })
        .execute();
};
exports.getRooms = async () => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .leftJoinAndSelect("room.devices", "device")
        .getMany();
};
exports.getRoom = async (room) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .leftJoinAndSelect("room.devices", "device")
        .where("room.name = :name", { name: room })
        .getOne();
};
exports.asignDeviceToRoom = async (room, device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder()
        .update(device_1.Device)
        .set({ room: room })
        .where("device.id = :id", { id: device })
        .execute();
};
exports.unasignDevice = async (device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder()
        .update(device_1.Device)
        .set({ room: undefined })
        .where("device.id = :id", { id: device })
        .execute();
};
async function generateDeviceId() {
    let cadena = "";
    for (let i = 0; i < 3; i += 1)
        cadena += String.fromCharCode(97 + Math.random() * 25);
    const user = await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.id = :id", { id: cadena })
        .getOne();
    if (user == null)
        return cadena.toUpperCase();
    else
        return generateDeviceId();
}
