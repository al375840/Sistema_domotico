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
    updateState() {
        throw new Error('Method not implemented.');
    }
 
}
