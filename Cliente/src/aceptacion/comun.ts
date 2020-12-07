  
import {DeviceService} from '../app/devices/device.service';
import {TestBed} from '@angular/core/testing';

export function obtainDeviceService(): DeviceService{
    TestBed.configureTestingModule({});
    return  TestBed.inject(DeviceService);

}

export function limpiarEstado(): void {
  // TODO: Hacer limpieza

}