import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Device } from '../devices/device';
import { DeviceNotExists } from '../devices/exceptions/device-not-exists';
import { Room } from '../rooms/room';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
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
    this.socket.emit("getUnasignedDevices");
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

  async addRoom(room: string) {
    this.socket.emit('addRoom', room);
    return new Promise<void>((resolve,reject) => {
      this.socket.once('addRoomRes', (done:boolean) => {
        if (!done) {
          reject("Error al crear habitación")
        }else{
          resolve()
        }
      });
    });
  }
  
  asignDevice(device:string,room:Room){
    this.socket.emit('asignDevice', room, device);
    return new Promise<void>((resolve,reject) => {
      this.socket.once('asignDeviceRes', (done:boolean) => {
        if (!done) {
          reject("Error al asignar")
        }else{
          resolve()
        }
      });
    });
  }
  
  unasignDevice(device:string){
    this.socket.emit('unasignDevice', device);
    return new Promise<void>((resolve,reject) => {
      this.socket.once('unasignDeviceRes', (done:boolean) => {
        if (!done) {
          reject("Error al asignar")
        }else{
          resolve()
        }
      });
    });
  }

  getRooms(): Observable<Array<Room>> {
    this.socket.emit("getRooms");
    return new Observable((obs) => {
      this.socket.on('rooms', (rooms: Room[]) => {
        obs.next(rooms);
      });
    });
  }

  getRoom(room: string): Promise<Room> {
    this.socket.emit('getRoom', room);
    return new Promise<Room>((resolve,reject) => {
      this.socket.once('getRoomRes', (res: Room) => {
        if (res == undefined) {
          reject("Error al obtener habitacion")
        }else{
          resolve(res)
        }
      });
    });
  }

  updateRoom(room: string, newRoom: string):Promise<void> {
    this.socket.emit('updateRoom', room, newRoom);
    return new Promise<void>((resolve,reject) => {
      this.socket.once('updateRoomRes', (done:boolean) => {
        if (!done) {
          reject("Error al actualizar habitacion")
        }else{
          resolve()
        }
      });
    });
  }

  deleteRoom(room: string) {
    this.socket.emit("deleteRoom",room)
    return new Promise<void>((resolve,reject) => {
      this.socket.once('deleteRoomRes', (done:boolean) => {
        if (!done) {
          reject("Nombre no valido")
        }else{
          resolve()
        }
      });
    });
  }

  disconect() {
    this.socket.close();
  }
}
