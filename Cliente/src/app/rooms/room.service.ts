import { Injectable } from '@angular/core';
import {Room} from './room';
import {Device} from '../devices/device';
import { Observable } from 'rxjs';
import { ServerService } from '../comun/server.service';
import { NameNotValid } from './exceptions/name-not-valid';
import { RoomNotExists } from './exceptions/room-not-exists';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  newRoom: any;

  constructor(private server:ServerService) { }

  async asignDevice(device: string, room: Room) {
    return await this.server.asignDevice(device,room).catch(()=>{throw new RoomNotExists(room.name)});
  }

  async unasignDevice(device: string) {
    throw new Error('Unimplemented');
  }

  async deleteRoom(room: string) {
    return await this.server.deleteRoom(room).catch(()=>{throw new RoomNotExists(room)});
  }

  async addRoom(room: string) {
    await this.server.addRoom(room).catch(()=>{throw new NameNotValid(room)} );
  }
  
  async getRoom(room: string): Promise<Room> {
    return await this.server.getRoom(room).catch(()=>{throw new RoomNotExists(room)});
  }

  getRooms(): Observable<Array<Room>>{
    return this.server.getRooms();
  }

  async updateRoom(room: string, newRoom: string) {
    return await this.server.updateRoom(room,newRoom).catch(()=>{throw new NameNotValid(newRoom)});
  }
}
