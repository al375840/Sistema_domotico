import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ServerService } from '../comun/server.service';
import { Device } from './device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private socket: Socket;

  devices: Device[];
  constructor(private server: ServerService) {}

  listUnasignedDevices(): Observable<Array<Device>> {
    return this.server.listUnasignedDevices();
  }

  checkState(idDevice: string): Observable<Device> {
    return this.server.checkState(idDevice);
  }
}
