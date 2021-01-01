import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { Device } from '../devices/device';
import { DeviceType } from '../devices/enums/typeEnum';
import { IServer } from './i-server';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { UpdateAlarm } from '../devices/others/IUpdateAlarm';
import { STORAGE, ILocalStorage } from '../localstorage/i-local-storage';
import { take } from 'rxjs/operators';
import { DeviceService } from '../devices/device.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService implements IServer{

  private socket: Socket;
  private alarmChanges: ReplaySubject<UpdateAlarm> = new ReplaySubject<UpdateAlarm>(1);
  private devices?: Device[];
  private subscription?: Subscription;
  constructor() {

    console.log("Servicio servidor iniciado");

    this.socket = io(environment.urlServer);

    this.socket.emit("emmitter")

    this.socket.on('updateAlarms', (alarms: UpdateAlarm) => {
      this.alarmChanges.next(alarms);
    });

    var timeout;
    timeout = setInterval(async () => {
      this.socket.emit("updateState", this.devices || [])
    }, 10000);

    this.socket.on('disconect', () => {
      console.log('Server disconected');
    });

  }

  getAlarmChanges$(): Observable<UpdateAlarm> {
    return this.alarmChanges
  }

  setDeviceList(odl: Observable<Device[]>): void {
    if(this.subscription)
      this.subscription.unsubscribe()
    this.subscription = odl.subscribe((dl) => this.devices = dl)
  }

}
