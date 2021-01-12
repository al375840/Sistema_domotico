import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "../devices/device";


export const STORAGE = new InjectionToken<ILocalStorage>('LocalStorage');

export interface ILocalStorage{
    addDevice(device:Device):Promise<string>;
    updateDevice(device:Device):Promise<boolean>;
    deleteDevice(id: string):Promise<Device | null>;
    getDevice(id: string): Promise<Device>;
    getDevices(): Observable<Device[]>;
}