import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';
import { IServer } from './i-server';

@Injectable({
  providedIn: 'root'
})
export class ServerService implements IServer{

  constructor() { }
  addDevice(type: DeviceType): Promise<string> {
    throw new Error('Method not implemented.');
  }
  deleteDevice(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  switchDeviceState(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  switchDeviceTurned(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getDevices(): Observable<Array<Device>> {
    throw new Error('Method not implemented.');
  }
  getDevice(id: string): Promise<Device> {
    throw new Error('Method not implemented.');
  }
  disconectHub(): Promise<void> {
    throw new Error('Method not implemented.');
  }

 
}
