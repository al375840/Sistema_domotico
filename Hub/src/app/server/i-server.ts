import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';
import { UpdateAlarm } from '../devices/others/IUpdateAlarm';


export const SERVER_SERVICE = new InjectionToken<IServer>('ServerService');

export interface IServer {
    getAlarmChanges$(): Observable<UpdateAlarm>;
    setDeviceList(odl: Observable<Device[]>): void;
}