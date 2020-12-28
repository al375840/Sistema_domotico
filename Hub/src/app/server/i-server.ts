import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';


export const SERVER_SERVICE = new InjectionToken<IServer>('ServerService');

export interface IServer {
    addDevice(type: DeviceType): Promise<string>;
    deleteDevice(id: string): Promise<void>;
    updateDeviceState(id: string, change:string): Promise<void>;
    getDevices(): Observable<Array<Device>>;
    getDevice(id: string): Promise<Device>;
    disconectHub(): Promise<void>;
}