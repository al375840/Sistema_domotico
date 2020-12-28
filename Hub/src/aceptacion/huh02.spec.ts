
import {take} from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { DeviceNotExists } from 'src/app/devices/exceptions/device-not-exist';
import { initializeTestBed, obtainDeviceService } from './comun';

describe('HUH02: Modificar el estado del dispositivo', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });

  it('Deberia poder modificar el estado de un dispositivo que exista', async () => {
    //Given el identificador del dispositivo y un estado válido.
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    
    //When el usuario lo modifica.
    if (device)
      await ds.switchDeviceState(device).catch((e) => {console.error(e)})
    //Then se realiza el cambio.
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    const addedDevice: Device | void = devices.find((d) => d.id == device);
    if (addedDevice) {
      expect(addedDevice.state == "MOTION_DETECTED").toBeTrue();
    }
    else {
      expect(false).toBeTrue();
    }
    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch((e) => {console.error(e)})
    }
  
  });

  it('No deberia poder modificar un dispositivo que no exista', async () => {
    //Given  el identificador del dispositivo y un estado inválido.
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    if (device) {
      await ds.deleteDevice(device).catch((e) => {console.error(e)})
    //When  el usuario lo modifica.
      expectAsync(ds.switchDeviceState(device)).toBeRejectedWith(new DeviceNotExists(device))
      
    //Then  se realiza el cambio.
    }
  });

  afterEach(() => {
    //limpiarEstado();
  });
});