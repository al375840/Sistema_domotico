import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';
import { UpdateAlarm } from '../devices/others/IUpdateAlarm';


export const SERVER_SERVICE = new InjectionToken<IServer>('ServerService');

export interface IServer {
    getAlarmChanges$(): Observable<UpdateAlarm>;
    setServerState(odl: Device[]): Promise<void>;
    addDevice(device:Device): void;
    updateDevice(device:Device): void;
    deleteDevice(device:Device): void;
}