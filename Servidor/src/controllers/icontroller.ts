import { Device } from "../entity/device";
import { Room } from "../entity/room";
import { updateState } from "../others/i-update-state";

export interface IController {
	getUnasignedDevices(): Promise<Device[] | undefined>;
	getDeviceState(device: string): Promise<Device | undefined>;
	addRoom(room: string): Promise<boolean>;
	setDevicesState(devices: Device[]): Promise<number>;
	updateDevicesState(us: updateState): Promise<number>;
	alarmsToTriggerOn(): Promise<Device[]>;
	alarmsToTriggerOff(): Promise<Device[]>;
	updateRoom(room: string, newroom: string): Promise<number>;
	deleteRoom(room: string): Promise<number>;
	getRooms(): Promise<Room[] | undefined>;
	getRoom(room: string): Promise<Room | undefined>;
	asignDeviceToRoom(room: Room, device: string): Promise<number>;
	unasignDevice(device: string): Promise<number>;
}
