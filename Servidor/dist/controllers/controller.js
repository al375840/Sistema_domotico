"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoom = exports.getDeviceState = exports.getUnasignedDevices = exports.addDevice = void 0;
const typeorm_1 = require("typeorm");
const device_1 = require("../entity/device");
const room_1 = require("../entity/room");
/*export const addDevice= async(device:Device)=>{
    const newDevice = await getRepository(Device).create(device);
    return await getRepository(Device).save(newDevice);
}*/
exports.addDevice = async (device) => {
    let id = await generateId();
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
        .printSql()
        .getMany();
};
exports.getDeviceState = async (device) => {
    return await typeorm_1.getRepository(device_1.Device)
        .createQueryBuilder("device")
        .where("device.id = :id", { id: device })
        .printSql()
        .getOne();
};
exports.getRoom = async (room) => {
    return await typeorm_1.getRepository(room_1.Room)
        .createQueryBuilder("room")
        .where("room.id = :id", { id: room })
        .printSql()
        .getOne();
};
async function generateId() {
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
        return generateId();
}
