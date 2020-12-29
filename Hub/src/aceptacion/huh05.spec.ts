
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
    const id = await ds.addDevice(type)
    //When el usuario lo desconecta.  
    await ds.switchDeviceTurned(id, false).catch((e) => {console.error(e)})
    //Then se realiza la desconexión.
    const addedDevice:Device = await ds.getDevice(id) 
    expect(addedDevice.turned).toBeFalse();

    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch((e) => {console.error(e)})
    }
    
  });

  it('Deberia no poder desconectar dispositivo que no existe', async () => {
    //Given  el identificador de un  dispositivo que no existe
    const device = "TEST"
    //When  el usuario lo desconecta.
    //Then no se realiza la eliminación.
    await expectAsync(ds.switchDeviceTurned(device, false)).toBeRejectedWith(new DeviceNotExists(device))
  });

  afterEach(() => {
    //limpiarEstado();
  });
});