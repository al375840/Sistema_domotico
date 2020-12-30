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
        this.updateState = async (devices) => {
            //Primero se quitan los dispositivos residuales de otros hubs
            await this.deviceRepository.createQueryBuilder("device")
                .delete()
                .where("device.id NOT IN (:...ids)", { ids: devices.map(d => d.id) })
                .execute();
            let localDevices = (await this.deviceRepository.createQueryBuilder().getMany()).map(d => d.id);
            for (let device of devices) {
                if (localDevices.includes(device.id)) {
                    await this.updateDevice(device);
                }
                else {
                    await this.addDevice(device);
                }
            }
        };
        this.alarmsToTriggerOn = async () => {
            let rwad = this.roomRepository
                .createQueryBuilder("room")
                .select("room.name")
                .leftJoin("room.devices", "device")
                .where("device.turned = :turned", { turned: false })
                .orWhere("device.state IN (:...states)", { states: ["MOTION_DETECTED", "OPEN"] });
            return this.deviceRepository
                .createQueryBuilder("device")
                .leftJoin("device.room", "r")
                .where("device.type = :type", { type: "alarma" })
                .andWhere("device.state = :s", { s: "OFF" })
                .andWhere("r.name IN (" + rwad.getQuery() + ")")
                .setParameters(rwad.getParameters())
                .getMany();
        };
        this.alarmsToTriggerOff = async () => {
            let rwad = this.roomRepository
                .createQueryBuilder("room")
                .select("room.name")
                .leftJoin("room.devices", "device")
                .where("device.turned = :turned", { turned: false })
                .orWhere("device.state IN (:...states)", { states: ["MOTION_DETECTED", "OPEN"] });
            return this.deviceRepository
                .createQueryBuilder("device")
                .leftJoin("device.room", "r")
                .where("device.type = :type", { type: "alarma" })
                .andWhere("device.state = :s", { s: "ON" })
                .andWhere("r.name NOT IN (" + rwad.getQuery() + ")")
                .setParameters(rwad.getParameters())
                .getMany();
        };
        this.updateDevice = async (device) => {
            return this.deviceRepository
                .createQueryBuilder("device")
                .update(device_1.Device)
                .set({ state: device.state, turned: device.turned })
                .where("device.id = :id", { id: device.id })
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
}
exports.Controller = Controller;
