import { Injectable } from '@angular/core';
import { Device } from '../devices/device';
import { ILocalStorage } from './i-local-storage';
import * as localforage from 'localforage';
import { Observable, ReplaySubject } from 'rxjs';
import { DeviceNotExists } from '../devices/exceptions/device-not-exist';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements ILocalStorage {
  private devices = new ReplaySubject<Device[]>(1);
  private emited = false;
  constructor() {
    
  }
  async addDevice(device: Device): Promise<string> {
    let id = device.id || await this.generateDeviceId();
    device.id = id;
    if (!((await localforage.keys()).includes(id))) {
      await localforage.setItem(id, device).catch((e) => {
        console.error(e);
      });
      await this.emiteChanges();
    }
    return id;
  }
  async updateDevice(device: Device): Promise<boolean> {
    if (device.id && (await localforage.getItem(device.id))) {
      await localforage.setItem(device.id, device);
      await this.emiteChanges();
      return true;
    } else {
      return false;
    }
  }
  async deleteDevice(id: string): Promise<boolean> {
    if (await localforage.getItem(id)) {
      await localforage.removeItem(id);
      await this.emiteChanges();
      return true;
    } else {
      return false;
    }
  }
  async getDevice(id: string): Promise<Device> {
    let device: Device | null = await localforage.getItem(id);
    if (device) {
      return device;
    } else {
      throw new DeviceNotExists(id);
    }
  }

  getDevices(): Observable<Device[]> {
    if(!this.emited){ // comprobamos que el subject tenga el estado inicial, solo se hace la primera vez que se solicita
    this.emiteChanges()
    this.emited=true;
  }
    return this.devices;
  }
  private async emiteChanges() {
    let devices: Device[] = [];
    await localforage.iterate(function(device: Device) {
      devices.push(device)
    });
    this.devices.next(devices)
    
  }

  private async generateDeviceId() {
    let cadena: string;
    do {
      cadena = '';
      for (let i = 0; i < 3; i += 1)
        cadena += String.fromCharCode(97 + Math.random() * 25);
    } while (await localforage.getItem(cadena));
    return cadena.toUpperCase();
  }
}
