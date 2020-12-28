
import {take} from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { DeviceNotExists } from 'src/app/devices/exceptions/device-not-exist';
import { initializeTestBed, obtainDeviceService } from './comun';

describe('HUH05: Desconectar dispositivos', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });

  it('Deberia poder desconectar dispositivo con un identificador correcto', async () => {
    //Given el identificador del dispositivo 
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    //When el usuario lo desconecta.  
    if (device)
    await ds.switchDeviceTurned(device).catch((e) => {console.error(e)})
    //Then se realiza la desconexión.
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    const addedDevice: Device | void = devices.find((d) => d.id == device);
    if (addedDevice) {
      expect(addedDevice.turned).toBeFalse();
    }
    else {
      expect(false).toBeTrue();
    }
    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch((e) => {console.error(e)})
    }
    
  });

  it('Deberia no poder desconectar dispositivo con un identificador incorrecto', async () => {
    //Given  el identificador de un  dispositivo que no existe
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    if (device) {
      await ds.deleteDevice(device).catch((e) => {console.error(e)})
    //When  el usuario lo desconecta.
    //Then no se realiza la eliminación.
    expectAsync(ds.switchDeviceTurned(device)).toBeRejectedWith(new DeviceNotExists(device))
    }
  });

  afterEach(() => {
    //limpiarEstado();
  });
});