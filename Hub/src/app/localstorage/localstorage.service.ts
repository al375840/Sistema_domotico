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
  private localdevices: Device[]=[];
  private created:boolean = false;
  private builded: Promise<void>;
  constructor() {
    this.builded = new Promise(async (resolve, reject) => {
      try {
        if (!this.created) {
          let devices: Device[] | null = await localforage.getItem('devices');
          if (devices) {
            this.localdevices = devices as Device[];
          } else {
            await localforage.setItem('devices', []);
            this.localdevices = [];
          }
          this.emiteChanges();
          this.created = true;
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
  async addDevice(device: Device): Promise<string> {
    await this.builded;
    let id = this.generateDeviceId();
    device.id = id;
    this.localdevices.push(device);
    await localforage.setItem('devices', this.localdevices).catch((e) => {
      console.error(e);
    });
    this.emiteChanges();
    return id;
  }
  async updateDevice(device: Device): Promise<boolean> {
    await this.builded;
    let index = this.localdevices.findIndex((d) => d.id == device.id);
    if (index != -1) {
      this.localdevices[index] = device;
      await localforage.setItem('devices', this.localdevices).catch((e) => {
        console.error(e);
      });
      this.emiteChanges();
      return true;
    } else {
      return false;
    }
  }
  async deleteDevice(id: string): Promise<boolean> {
    await this.builded;
    let index = this.localdevices.findIndex((d) => d.id == id);
    if (index != -1) {
      this.localdevices.splice(index, 1);
      await localforage.setItem('devices', this.localdevices).catch((e) => {
        console.error(e);
      });
      this.emiteChanges();
      return true;
    } else {
      return false;
    }
  }
  async getDevice(id: string): Promise<Device> {
    await this.builded;
    return new Promise((resolve, reject) => {
      let index = this.localdevices.findIndex((d) => d.id == id);
      if (index != -1) {
        resolve(this.localdevices[index]);
      } else {
        reject(new DeviceNotExists(id));
      }
    });
  }
  getDevices(): Observable<Device[]> {
    return this.devices;
  }
  private emiteChanges() {
    this.devices.next(this.localdevices);
  }

  private generateDeviceId(): string {
    let cadena: string;
    let ids = new Set(this.localdevices.map((d) => d.id));
    do {
      cadena = '';
      for (let i = 0; i < 3; i += 1)
        cadena += String.fromCharCode(97 + Math.random() * 25);
    } while (cadena in ids);
    return cadena.toUpperCase();
  }
}
