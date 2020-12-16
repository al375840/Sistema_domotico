import { Injectable } from '@angular/core';
import {Room} from './room';
import {Device} from '../devices/device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  newRoom: any;

  constructor() { }

  asignDevice(device: string, room: string) {
    throw new Error('Unimplemented');
  }

  deleteRoom(room: string) {
    throw new Error('Unimplemented');
  }

  addRoom(room: string) {
    throw new Error('Unimplemented');
  }
  
  getRoom(room: string): Observable<Room> {
    throw new Error('Unimplemented');
  }

  getRooms(): Observable<Array<Room>>{
    throw new Error('Unimplemented');
  }

  updateRoom(room: string, newRoom: string) {
    throw new Error('Unimplemented');
  }
}
