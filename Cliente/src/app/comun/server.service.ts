import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Device } from '../devices/device';
import { DeviceNotExists } from '../devices/exceptions/device-not-exists';
import { AsignFailed } from '../rooms/exceptions/asign-failed';
import { NameNotValid } from '../rooms/exceptions/name-not-valid';
import { RoomNotExists } from '../rooms/exceptions/room-not-exists';
import { UpdateFailed } from '../rooms/exceptions/update-failed';
import { Room } from '../rooms/room';
import { IServer } from './i-server';

@Injectable({
  providedIn: 'root',
})
export class ServerService implements IServer {
  private socket: Socket;
  private unasignedDevices: ReplaySubject<Array<Device>> = new ReplaySubject<Array<Device>>(1);
  private roomlist: ReplaySubject<Array<Room>> = new ReplaySubject<Array<Room>>(1); 

  constructor() {
    this.socket = io(environment.urlServer);

    this.socket.on('unasigndevices', (devices: Device[]) => {
      this.unasignedDevices.next(devices);
    });

    this.socket.on('rooms', (rooms: Room[]) => {
      this.roomlist.next(rooms);
    });

    this.socket.on('disconnect', () => {
      console.log('Server disconected');
    });
  }

  disconection(): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.socket.on('hubconexion',(res:boolean)=>{
        obs.next(res);
      })
    })
  }

  listUnasignedDevices(): Observable<Array<Device>> {
    this.socket.emit('getUnasignedDevices');
    return this.unasignedDevices.asObservable();
  }

  checkState(idDevice: string): Promise<Device> {
    this.socket.emit('checkState', idDevice);
      return new Promise<Device>((resolve,reject)=>this.socket.on('checkState', (device: Device) => {
        if(device)
          resolve(device);
        else
          reject(new DeviceNotExists(idDevice));

      }));

  }

  async addRoom(room: string) {
    this.socket.emit('addRoom', room);
    return new Promise<void>((resolve, reject) => {
      this.socket.once('addRoomRes', (done: boolean) => {
        if (!done) {
          reject(new NameNotValid(room));
        } else {
          resolve();
        }
      });
    });
  }

  asignDevice(device: string, room: Room) {
    this.socket.emit('asignDevice', room, device);
    return new Promise<void>((resolve, reject) => {
      this.socket.once('asignDeviceRes', (done: boolean) => {
        if (!done) {
          reject(new AsignFailed(room.name, device));
        } else {
          resolve();
        }
      });
    });
  }

  unasignDevice(device: string) {
    this.socket.emit('unasignDevice', device);
    return new Promise<void>((resolve, reject) => {
      this.socket.once('unasignDeviceRes', (done: boolean) => {
        if (!done) {
          reject(new DeviceNotExists(device));
        } else {
          resolve();
        }
      });
    });
  }

  getRooms(): Observable<Array<Room>> {
    this.socket.emit('getRooms');
    return this.roomlist.asObservable();
  }

  getRoom(room: string): Promise<Room> {
    this.socket.emit('getRoom', room);
    return new Promise<Room>((resolve, reject) => {
      this.socket.once('getRoomRes', (res: Room) => {
        if (res == undefined) {
          reject(new RoomNotExists(room));
        } else {
          resolve(res);
        }
      });
    });
  }

  updateRoom(room: string, newRoom: string): Promise<void> {
    this.socket.emit('updateRoom', room, newRoom);
    return new Promise<void>((resolve, reject) => {
      this.socket.once('updateRoomRes', (done: boolean) => {
        if (!done) {
          reject(new UpdateFailed(room, newRoom));
        } else {
          resolve();
        }
      });
    });
  }

  deleteRoom(room: string) {
    this.socket.emit('deleteRoom', room);
    return new Promise<void>((resolve, reject) => {
      this.socket.once('deleteRoomRes', (done: boolean) => {
        if (!done) {
          reject(new RoomNotExists(room));
        } else {
          resolve();
        }
      });
    });
  }

  disconect() {
    this.socket.close();
  }
}
