import { Injectable } from '@angular/core';
import { Device } from './Device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  async listDevices(): Promise<Array<Device>> {
    throw new Error('Unimplemented');
  }

  async checkState(device: string): Promise<Device> {
    throw new Error('Unimplemented');
  }

  async checkNewDevices(): Promise<Observable<Array<Device>>> {
    throw new Error('Unimplemented');
  }
}
