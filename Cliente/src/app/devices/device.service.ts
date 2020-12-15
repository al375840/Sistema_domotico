import { Injectable } from '@angular/core';
import { Device } from './device';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DeviceNotExists } from './exceptions/device-not-exists';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private socket: Socket;

  devices: Device[];
  constructor() {
    this.socket = io(environment.urlServer);

    this.socket.on('unasigndevices', (devices: Device[]) => {
      this.devices = devices;
    });

    this.socket.on('disconect', () => {
      console.log('Server disconected');
    });
  }

  listUnasignedDevices(): Observable<Array<Device>> {
    return new Observable((obs) => {
      this.socket.on('unasigndevices', (devices: Device[]) => {
        obs.next(devices);
      });
    });
  }

  checkState(idDevice: string): Observable<Device> {
    this.socket.emit('checkState', idDevice);
    return new Observable((obs) => {
      this.socket.on('checkState', (device: Device) => {
        if (device == null) {
          obs.error(new DeviceNotExists(idDevice));
        }
        obs.next(device);
      });
    });
  }
}
