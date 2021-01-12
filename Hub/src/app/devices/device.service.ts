import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ILocalStorage, STORAGE } from '../localstorage/i-local-storage';
import { IServer, SERVER_SERVICE } from '../server/i-server';
import { Alarm, Device, Movement } from './device';
import { DeviceType } from './enums/typeEnum';
import { DeviceNotExists } from './exceptions/device-not-exist';
import { UpdateAlarm } from './others/IUpdateAlarm';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(@Inject(STORAGE)private storage:ILocalStorage, @Inject(SERVER_SERVICE) private ss: IServer) { 
    this.addInitialDevices().then(()=>{
      storage.getDevices().pipe(take(1)).subscribe((devices)=>ss.setServerState(devices))
    });
    ss.getAlarmChanges$().subscribe((ua)=>this.updateAlarms(ua))
    
  }

  async addDevice(type: DeviceType): Promise<string> {
    let device: Device;
    switch(type){
      case DeviceType.APERTURA: {
        device = {type:type, state: 'CLOSE',turned: true} 
        break
      }
      case DeviceType.MOVIMIENTO: {
        device = {type:type, state: 'NO_MOTION',turned: true} 
        break
      }
      case DeviceType.ALARMA: {
        device = {type:type, state: 'OFF',turned: true} 
        break
      }
    }
    let id = await this.storage.addDevice(device);
    device.id = id
    this.ss.addDevice(device)
    return id
  }

  async deleteDevice(id: string): Promise<void> {
    const deleted = await this.storage.deleteDevice(id);
    if (!deleted)
      throw new DeviceNotExists(id);
    else
      this.ss.deleteDevice(deleted);
  }

  async switchDeviceState(id: string, state:  "ON" | "OFF" | "MOTION_DETECTED" | "NO_MOTION" | "CLOSE" | "OPEN"): Promise<void> {
    let device = await this.getDevice(id);
    device.state = state;
    const updated = await this.storage.updateDevice(device);
    if (!updated)
      throw new DeviceNotExists(id);
    else
      this.ss.updateDevice(device)
  }
 
  async switchDeviceTurned(id: string, turned: boolean): Promise<void> {
    let device = await this.getDevice(id)
    device.turned = turned;
    const updated = await this.storage.updateDevice(device);
    if (!updated)
      throw new DeviceNotExists(id);
    else
      this.ss.updateDevice(device)
  }

  getDevices(): Observable<Device[]>{
    return this.storage.getDevices()
  }

  async getDevice(id: string): Promise<Device> {
    return this.storage.getDevice(id)
  }

  private async addInitialDevices(){
    let inidev:Device[] = [
      {id:'FEN',type:DeviceType.MOVIMIENTO,state:'NO_MOTION',turned:true},
      {id:'MAX',type:DeviceType.MOVIMIENTO,state:'NO_MOTION',turned:true},
      {id:'MCU',type:DeviceType.ALARMA,state:'OFF',turned:true},
      {id:'OPO',type:DeviceType.ALARMA,state:'OFF',turned:true},
      {id:'TNT',type:DeviceType.APERTURA,state:'CLOSE',turned:true},
      {id:'BEN',type:DeviceType.APERTURA,state:'CLOSE',turned:true},
    ]
    for(let device of inidev){
      await this.storage.addDevice(device);
    }
  }
  
  private async updateAlarms(ua:UpdateAlarm){
    ua.turnOn.forEach(id=>{
      if(id)
      this.switchDeviceState(id,"ON")
    })
    ua.turnOff.forEach(id=>{
      if(id)
      this.switchDeviceState(id,"OFF")
    })
  }
}

