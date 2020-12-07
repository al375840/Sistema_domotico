import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { TestBed } from '@angular/core/testing';

TestBed.configureTestingModule({});
let ds;
let rs;
export function obtainDeviceService(): DeviceService {
  rs = TestBed.inject(DeviceService);
  return rs;
}

export function obtainRoomService(): RoomService {
  ds = TestBed.inject(RoomService);
  return ds;
}

export function limpiarEstado(): void {
  //TODO limpiar estado
}
