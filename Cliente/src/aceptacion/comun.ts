  
import {DeviceService} from '../app/devices/device.service';
import {RoomService} from '../app/rooms/room.service';
import {TestBed} from '@angular/core/testing';

export function obtainDeviceService(): DeviceService{
    TestBed.configureTestingModule({});
    return  TestBed.inject(DeviceService);

}

export function obtainRoomService(): RoomService{
  TestBed.configureTestingModule({});
  return  TestBed.inject(RoomService);

}

export function limpiarEstado(): void {
  // TODO: Hacer limpieza

}