import { Injectable } from '@angular/core';
import { Device } from './device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  listUnasignedDevices(): Observable<Array<Device>> {
    throw new Error('Unimplemented');
  }

  async checkState(device: string): Promise<Device> {
    throw new Error('Unimplemented');
  }


}
