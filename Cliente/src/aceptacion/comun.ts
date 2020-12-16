import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { TestBed } from '@angular/core/testing';
import { ServerService } from '../app/comun/server.service';

let tb
export function initializeTestBed() {
  tb=TestBed.configureTestingModule({
    providers:[DeviceService,RoomService,ServerService]
  });
}

export function obtainDeviceService(): DeviceService {
  let rs = tb.inject(DeviceService);
  return rs;
}

export function obtainRoomService(): RoomService {
  let ds = tb.inject(RoomService);
  return ds;
}

export function limpiarEstado(): void {
  let server = tb.inject(ServerService)
  server.disconect()
}
