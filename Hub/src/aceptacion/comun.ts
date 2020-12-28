import { DeviceService } from '../app/devices/device.service';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { ServerService } from '../app/server/server.service';
import { SERVER_SERVICE } from 'src/app/server/i-server';
import { HubService } from 'src/app/hub/hub.service';

let ds:any = undefined;
let hs:any = undefined;
let tb:any = undefined;
export function initializeTestBed() {
  
  tb = TestBed.configureTestingModule({
    providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}],
  });
  
}

export function obtainDeviceService(): DeviceService {
  if (ds == undefined) {
    ds = tb.inject(DeviceService);
  }
  return ds;
}

export function obtainHubService(): HubService {
  if (hs == undefined) {
    hs = tb.inject(HubService);
  }
  return hs;
}

export function limpiarEstado(): void {
  //TODO
}
