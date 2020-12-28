
import {take} from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { DeviceNotExists } from 'src/app/devices/exceptions/device-not-exist';
import { initializeTestBed, obtainDeviceService } from './comun';

describe('HUH07: Obtener detalles de un dispositivo', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });

  it('Deberia poder obtener los detalles con su identifiacador', async () => {
    //Given Identificador del dispositivo que existe.
    const type:DeviceType = DeviceType.MOVIMIENTO
    let device;
    let getDevice;
    try{
      device = await ds.addDevice(type)
      //When el usuario obtiene los detalles.
      getDevice = await ds.getDevice(device)
    }catch(e){
      console.error(e)
    }
    
    //Then se muestran los detalles del dispositivo
    expect(getDevice).toBeDefined();
  });

  it('No deberia poder obtener los detalles de un dispositivo usando un identificador no válido', async () => {
    //Given Identificador de dispositicov que no existe.
    const type:DeviceType = DeviceType.MOVIMIENTO
    let device;
    try{
      device = await ds.addDevice(type)
      await ds.deleteDevice(device)
      //When el usuario obtiene los detalles.
    }catch(e){
      console.error(e)
    } 
    //Then no se muestran los detalles del dispositivo
    if (device)
      expectAsync(ds.getDevice(device)).toBeRejectedWith(new DeviceNotExists(device))
  });

  afterEach(() => {
    //limpiarEstado();
  });
});