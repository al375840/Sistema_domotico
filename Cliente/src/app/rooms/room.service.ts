import { Injectable } from '@angular/core';
import {Room} from './room';
import {Device} from '../devices/device';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  newRoom: any;

  constructor() { }

  asignDevice(device:string, room:string) {
    throw new Error('Unimplemented');
  }

  deleteRoom(room:string) {
    throw new Error('Unimplemented');
  }

  addRoom(room:string) {
    throw new Error('Unimplemented');
  }
}
