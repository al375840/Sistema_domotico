import { Injectable } from '@angular/core';
import {Room} from './room';
import {Device} from '../devices/device';
import { Observable } from 'rxjs';
import { ServerService } from '../comun/server.service';
import { NameNotValid } from './exceptions/name-not-valid';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  newRoom: any;

  constructor(private server:ServerService) { }

  asignDevice(device: string, room: string) {
    throw new Error('Unimplemented');
  }

  deleteRoom(room: string) {
    throw new Error('Unimplemented');
  }

  async addRoom(room: string) {
    
    await this.server.addRoom(room).catch(()=>{throw new NameNotValid(room)} );
    
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
