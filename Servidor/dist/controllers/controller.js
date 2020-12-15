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
const addDevice = async (device) => {
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
exports.addDevice = addDevice;
const getUnasignedDevices = async () => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.room IS NULL")
        .printSql()
        .getMany();
};
exports.getUnasignedDevices = getUnasignedDevices;
const getDeviceState = async (device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.id = :id", { id: device })
        .printSql()
        .getOne();
};
exports.getDeviceState = getDeviceState;
const addRoom = async (room) => {
    let id = await generateDeviceId();
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder()
        .insert()
        .values({
        name: room,
    })
        .execute();
};
exports.addRoom = addRoom;
const updateRoom = async (room, newroom) => {
    let id = await generateDeviceId();
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .update(room_1.Room)
        .set({ name: newroom })
        .where("room.name = :name", { name: room })
        .execute();
};
exports.updateRoom = updateRoom;
const deleteRoom = async (room) => {
    let id = await generateDeviceId();
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .delete()
        .where("room.name = :name", { name: room })
        .execute();
};
exports.deleteRoom = deleteRoom;
const getRooms = async () => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .printSql()
        .getMany();
};
exports.getRooms = getRooms;
const getRoom = async (room) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .where("room.id = :id", { id: room })
        .printSql()
        .getOne();
};
exports.getRoom = getRoom;
const asignDeviceToRoom = async (room, device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .update(device_1.Device)
        .set({ room: room })
        .where("device.id = :id", { id: device })
        .printSql()
        .execute();
};
exports.asignDeviceToRoom = asignDeviceToRoom;
const unasignDevice = async (device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .update(device_1.Device)
        .set({ room: null })
        .where("device.id = :id", { id: device })
        .printSql()
        .execute();
};
exports.unasignDevice = unasignDevice;
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
