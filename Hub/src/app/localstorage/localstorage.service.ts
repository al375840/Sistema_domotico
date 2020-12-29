import { Injectable } from '@angular/core';
import { Device } from '../devices/device';
import { ILocalStorage } from './i-local-storage';
import  * as localforage from "localforage";
import { Observable, ReplaySubject } from 'rxjs';
import { DeviceNotExists } from '../devices/exceptions/device-not-exist';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements ILocalStorage{

  private devices = new ReplaySubject<Device[]>(1)
  private localdevices:Device[] = []
  constructor() { 
    localforage.getItem("devices").then(async(devices)=>{
      try{
          if(devices){
            this.localdevices = devices as Device[];
          }else{
            await localforage.setItem("devices",[]);
            this.localdevices = []
          }
          this.emiteChanges();
      }catch(e){
        console.error(e)
      }
    })
  }
  async addDevice(device: Device): Promise<string> {
    let id = this.generateDeviceId()
    device.id=id;
    this.localdevices.push(device);
    await localforage.setItem("devices",this.localdevices).catch((e)=>{console.error(e)});
    this.emiteChanges()
    return id;
  }
  async updateDevice(device: Device): Promise<boolean> {
    let index=this.localdevices.findIndex(d=>d.id);
    if(index != -1){
      this.localdevices[index]=device;
      await localforage.setItem("devices",this.localdevices).catch((e)=>{console.error(e)});
      this.emiteChanges()
      return true;
    }else{
      return false;
    }
  }
  async deleteDevice(id: string): Promise<boolean> {
    let index = this.localdevices.findIndex(d=>d.id==id)
    if(index != -1){
      this.localdevices.splice(index,1);
      await localforage.setItem("devices",this.localdevices).catch((e)=>{console.error(e)});
      this.emiteChanges()
      return true;
    }else{
      return false;
    }
  }
  getDevice(id: string): Promise<Device> {
    return new Promise((resolve,reject)=>{
      let index = this.localdevices.findIndex(d=>d.id==id);
      if(index != -1){
        resolve(this.localdevices[index]);
      }else{
        reject(new DeviceNotExists(id));
      }
    })
  }
  getDevices(): Observable<Device[]> {
    return this.devices
  }
  private emiteChanges(){
    this.devices.next(this.localdevices)
  }

  private  generateDeviceId(): string {
    let cadena: string;
    let ids = new Set(this.localdevices.map(d=>d.id))
    do{
      cadena = "";
      for (let i = 0; i < 3; i += 1)
        cadena += String.fromCharCode(97 + Math.random() * 25);
    }while(cadena in ids)
		return cadena.toUpperCase();
		
	}
  
}
