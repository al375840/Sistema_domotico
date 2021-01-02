import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { Device } from '../devices/device';
import { Room } from '../rooms/room';


export const SERVER_SERVICE = new InjectionToken<IServer>('ServerService');

export interface IServer {
    listUnasignedDevices(): Observable<Array<Device>>;
    checkState(idDevice: string): Promise<Device>;
    addRoom(room: string): Promise<void>;
    asignDevice(device: string, room: Room): Promise<void>;
    unasignDevice(device: string): Promise<void>;
    getRooms(): Observable<Array<Room>>;
    getRoom(room: string): Promise<Room>;
    updateRoom(room: string, newRoom: string): Promise<void>;
    deleteRoom(room: string): Promise<void>;
    disconection(): Observable<boolean>;
}