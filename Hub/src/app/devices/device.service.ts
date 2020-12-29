import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ILocalStorage, STORAGE } from '../localstorage/i-local-storage';
import { Alarm, Device, Movement } from './device';
import { DeviceType } from './enums/typeEnum';
import { DeviceNotExists } from './exceptions/device-not-exist';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(@Inject(STORAGE)private storage:ILocalStorage) { 
  }

  async addDevice(type: DeviceType): Promise<string> {
    let device: Device;
    switch(type){
      case DeviceType.APERTURA: {
        device = {type:type, state: 'CLOSE',turned: true} 
        break
      }
      case DeviceType.MOVIMIENTO: {
        device = {type:type, state: 'NO_MOTION',turned: true} 
        break
      }
      case DeviceType.ALARMA: {
        device = {type:type, state: 'OFF',turned: true} 
        break
      }
    }
    return this.storage.addDevice(device);
  }

  async deleteDevice(id: string): Promise<void> {
    const deleted = await this.storage.deleteDevice(id);
    if (!deleted)
      throw new DeviceNotExists(id);
  }

  async switchDeviceState(id: string, state:  "ON" | "OFF" | "MOTION_DETECTED" | "NO_MOTION" | "CLOSE" | "OPEN"): Promise<void> {
    let device = await this.getDevice(id)
    device.state = state;
    const switched = await this.storage.updateDevice(device);
    if (!switched)
      throw new DeviceNotExists(id);
  }
 
  async switchDeviceTurned(id: string, turned: boolean): Promise<void> {
    let device = await this.getDevice(id)
    device.turned = turned;
    const switched = await this.storage.updateDevice(device);
    if (!switched)
      throw new DeviceNotExists(id);
  }

  getDevices(): Observable<Device[]>{
    return this.storage.getDevices()
  }

  async getDevice(id: string): Promise<Device> {
    return this.storage.getDevice(id)
  }

}

