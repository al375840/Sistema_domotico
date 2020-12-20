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

  async asignDevice(device: string, room: Room) {
    throw new Error('Unimplemented');
  }

  async unasignDevice(device: string) {
    throw new Error('Unimplemented');
  }

  async deleteRoom(room: string) {
    return await this.server.deleteRoom(room).catch(()=>{throw new Error()});
  }

  async addRoom(room: string) {

    await this.server.addRoom(room).catch(()=>{throw new NameNotValid(room)} );
    
  }
  
  async getRoom(room: string): Promise<Room> {
    throw new Error('Unimplemented');
  }

  getRooms(): Observable<Array<Room>>{
    throw new Error('Unimplemented');
  }

  async updateRoom(room: string, newRoom: string) {
    throw new Error('Unimplemented');
  }
}
