import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';


export const SERVER_SERVICE = new InjectionToken<IServer>('ServerService');

export interface IServer {
    updateState(): void
}