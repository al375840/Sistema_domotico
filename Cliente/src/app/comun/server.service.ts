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
      this.socket.once('addRoomRes', (res: string) => {
        if (res == 'Error') {
          reject("Nombre no valido")
        }else{
          resolve()
        }
      });
    });
  }

  getRooms(): Observable<Array<Room>> {
    throw new Error('Unimplemented');
  }

  getRoom(room: string): Observable<Room> {
    throw new Error('Unimplemented');
  }

  updateRoom(room: string, newRoom: string) {
    throw new Error('Unimplemented');
  }

  deleteRoom(room: string) {
    this.socket.emit("deleteRoom",room)
    return new Promise<void>((resolve,reject) => {
      this.socket.once('deleteRoomRes', (res: string) => {
        if (res == 'Error') {
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
