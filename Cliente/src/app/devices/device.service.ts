import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ServerService } from '../comun/server.service';
import { Device } from './device';
import { DeviceNotExists } from './exceptions/device-not-exists';
import { IServer, SERVER_SERVICE } from '../comun/i-server';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  devices: Device[];
  constructor(@Inject('IServer')private server: IServer) {}

  listUnasignedDevices(): Observable<Array<Device>> {
    return this.server.listUnasignedDevices();
  }

  checkState(idDevice: string): Observable<Device> {
    return this.server.checkState(idDevice);
  }

  async unasignDevice(device: string) {
    return await this.server.unasignDevice(device).catch(() => {throw new DeviceNotExists(device); });
  }
}
