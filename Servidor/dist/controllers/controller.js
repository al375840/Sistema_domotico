"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const device_1 = require("../entity/device");
const room_1 = require("../entity/room");
/*export const addDevice= async(device:Device)=>{
    const newDevice = await this.deviceRepository.create(device);
    return await this.deviceRepository.save(newDevice);
}*/
class Controller {
    constructor(c) {
        this.addDevice = async (device) => {
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
        this.getUnasignedDevices = () => {
            return this.deviceRepository
                .createQueryBuilder("device")
                .where("device.room IS NULL")
                .getMany();
        };
        this.getDeviceState = (device) => {
            return this.deviceRepository
                .createQueryBuilder("device")
                .where("device.id = :id", { id: device })
                .getOne();
        };
        this.addRoom = (room) => {
            return this.roomRepository
                .createQueryBuilder()
                .insert()
                .values({
                name: room,
            })
                .execute();
        };
        this.updateRoom = (room, newroom) => {
            return this.roomRepository
                .createQueryBuilder("room")
                .update(room_1.Room)
                .set({ name: newroom })
                .where("room.name = :name", { name: room })
                .execute();
        };
        this.deleteRoom = (room) => {
            return this.roomRepository
                .createQueryBuilder("room")
                .delete()
                .where("room.name = :name", { name: room })
                .execute();
        };
        this.getRooms = () => {
            return this.roomRepository
                .createQueryBuilder("room")
                .leftJoinAndSelect("room.devices", "device")
                .getMany();
        };
        this.getRoom = (room) => {
            return this.roomRepository
                .createQueryBuilder("room")
                .leftJoinAndSelect("room.devices", "device")
                .where("room.name = :name", { name: room })
                .getOne();
        };
        this.asignDeviceToRoom = (room, device) => {
            return this.deviceRepository
                .createQueryBuilder()
                .update(device_1.Device)
                .set({ room: room })
                .where("device.id = :id", { id: device })
                .execute();
        };
        this.unasignDevice = (device) => {
            return this.deviceRepository
                .createQueryBuilder()
                .update(device_1.Device)
                .set({ room: undefined })
                .where("device.id = :id", { id: device })
                .execute();
        };
        this.deviceRepository = c.getRepository(device_1.Device);
        this.roomRepository = c.getRepository(room_1.Room);
    }
    async generateDeviceId() {
        let cadena = "";
        for (let i = 0; i < 3; i += 1)
            cadena += String.fromCharCode(97 + Math.random() * 25);
        const user = await this.deviceRepository
            .createQueryBuilder("device")
            .where("device.id = :id", { id: cadena })
            .getOne();
        if (user == null)
            return cadena.toUpperCase();
        else {
            console.log("ID REPETIDA");
            return this.generateDeviceId();
        }
    }
}
exports.Controller = Controller;
