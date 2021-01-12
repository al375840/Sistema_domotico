import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Device } from '../devices/device';
import { UpdateAlarm } from '../devices/others/IUpdateAlarm';
import { IServer } from './i-server';
import { updateState } from './i-update-state';

@Injectable({
  providedIn: 'root',
})
export class ServerService implements IServer {
  private alarmChanges: ReplaySubject<UpdateAlarm> = new ReplaySubject<UpdateAlarm>(
    1
  );
  private us = {
    toAdd: [],
    toDelete: [],
    toUpdate: [],
  } as updateState;
  constructor() {
  
  }
  private startConexion(devices: Device[]){
    console.log('Servicio servidor iniciado');

    let socket = io(environment.urlServer);

    socket.on('updateAlarms', (alarms: UpdateAlarm) => {
      this.alarmChanges.next(alarms);
    });
    socket.on('disconect', () => {
      console.log('Server disconected');
    });
    socket.emit('emmitter', devices);
    console.log('emitiendo estado al servidor');
    setInterval(async () => {
      socket.emit('updateState', this.us);
      this.us = {
        toAdd: [],
        toDelete: [],
        toUpdate: [],
      };
    }, 10000);
  }

  getAlarmChanges$(): Observable<UpdateAlarm> {
    return this.alarmChanges;
  }

  async setServerState(devices: Device[]): Promise<void> {
    this.startConexion(devices);
  }

  addDevice(device: Device): void {
    this.us.toAdd.push(device);
  }

  updateDevice(device: Device): void {
    let d = this.us.toUpdate.find((d) => d.id == device.id);
    if (d) {
      d.state = device.state;
      d.turned = device.turned;
    } else {
      this.us.toUpdate.push(device);
    }
  }

  deleteDevice(device: Device): void {
    this.us.toDelete.push(device);
  }
}
