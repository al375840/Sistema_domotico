import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './device';
import { DeviceType } from './enums/typeEnum';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor() { 

  }

  async addDevice(type: DeviceType): Promise<string> {
      throw new Error('Unimplemented')
  }

  async deleteDevice(id: string): Promise<void> {
    throw new Error('Unimplemented')
  }

  async updateDeviceState(id: string, change:string): Promise<void> {
    throw new Error('Unimplemented')
  }

  getDevices(): Observable<Device[]>{
    throw new Error('Unimplemented')
  }

  async getDevice(id: string): Promise<void> {
    throw new Error('Unimplemented')
  }
}