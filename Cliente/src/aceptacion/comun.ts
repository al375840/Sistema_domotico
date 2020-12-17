import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { TestBed } from '@angular/core/testing';
import { ServerService } from '../app/comun/server.service';

let ds = undefined;
let rs = undefined;
let tb = undefined;
export function initializeTestBed() {
  if (tb == undefined){
    tb = TestBed.configureTestingModule({
      providers: [DeviceService, RoomService, ServerService],
    });
  }
}

export function obtainDeviceService(): DeviceService {
  if (rs == undefined) {
    rs = tb.inject(DeviceService);
  }
  return rs;
}

export function obtainRoomService(): RoomService {
  if (ds == undefined) {
    ds = tb.inject(RoomService);
  }
  return ds;
}

export function limpiarEstado(): void {
  //TODO
}
