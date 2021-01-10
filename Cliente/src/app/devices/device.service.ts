import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './device';
import { IServer, SERVER_SERVICE } from '../comun/i-server';
import { map } from 'rxjs/operators';
import { orderDevices } from '../comun/utilityFunctions';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(@Inject(SERVER_SERVICE)private server: IServer) {
  }

  listUnasignedDevices(): Observable<Array<Device>> {
    return this.server.listUnasignedDevices().pipe(map(devices=>{
      return devices.sort(orderDevices)
    }));
  }

  checkState(idDevice: string): Promise<Device> {
    return this.server.checkState(idDevice);
  }

  async unasignDevice(device: string) {
    return await this.server.unasignDevice(device);
  }
}
