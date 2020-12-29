import { DeviceService } from '../app/devices/device.service';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { ServerService } from '../app/server/server.service';
import { SERVER_SERVICE } from 'src/app/server/i-server';
import { LocalStorageService } from 'src/app/localstorage/localstorage.service';
import { STORAGE } from 'src/app/localstorage/i-local-storage';

let ds:any = undefined;
let ls:any = undefined;
let tb:any = undefined;
export function initializeTestBed() {
  
  tb = TestBed.configureTestingModule({
    providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}, {provide:STORAGE, useClass:LocalStorageService}],
  });
  
}

export function obtainDeviceService(): DeviceService {
  if (ds == undefined) {
    ds = tb.inject(DeviceService);
  }
  return ds;
}

export function obtainHubService(): LocalStorageService {
  if (ls == undefined) {
    ls = tb.inject(LocalStorageService);
  }
  return ls;
}

export function limpiarEstado(): void {
  //TODO
}
