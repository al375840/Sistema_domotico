import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './device';
import { IServer, SERVER_SERVICE } from '../comun/i-server';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  devices: Device[];
  constructor(@Inject(SERVER_SERVICE)private server: IServer) {}

  listUnasignedDevices(): Observable<Array<Device>> {
    return this.server.listUnasignedDevices();
  }

  checkState(idDevice: string): Promise<Device> {
    return this.server.checkState(idDevice);
  }

  async unasignDevice(device: string) {
    return await this.server.unasignDevice(device);
  }
}
