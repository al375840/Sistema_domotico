import { Device } from "../entity/device";
import { Room } from "../entity/room";

export interface IController {
	getUnasignedDevices(): Promise<Device[] | undefined>;
	getDeviceState(device: string): Promise<Device | undefined>;
	addRoom(room: string): Promise<boolean>;
	updateState(devices: Device[]): Promise<number>;
	alarmsToTriggerOn(): Promise<Device[]>;
	alarmsToTriggerOff(): Promise<Device[]>;
	updateRoom(room: string, newroom: string): Promise<number>;
	deleteRoom(room: string): Promise<number>;
	getRooms(): Promise<Room[] | undefined>;
	getRoom(room: string): Promise<Room | undefined>;
	asignDeviceToRoom(room: Room, device: string): Promise<number>;
	unasignDevice(device: string): Promise<number>;
}
