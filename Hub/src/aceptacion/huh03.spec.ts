
import {take} from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { DeviceNotExists } from 'src/app/devices/exceptions/device-not-exist';
import { initializeTestBed, obtainDeviceService } from './comun';

describe('HUH03: Eliminar dispositivo', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });

  it('Deberia poder eliminar con un identificador que existe ', async () => {
    //Given el identificador de un dispositivo que existe
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    //When el usuario lo elimina.
    if (device)
      await ds.deleteDevice(device).catch((e) => {console.error(e)})
    //Then se quita del listado de dispositivos.
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    const deletedDevice: Device | void = devices.find((d) => d.id == device);
    expect(deletedDevice).toBeUndefined();
  });

  it('Deberia no poder eliminar un dispositivo con un identificador que no existe ', async () => {
    //Given  el identificador de un  dispositivo que no existe ya que no sigue el estandar
    let id = 'TEST'
    
    //When  el usuario lo elimina.
    //Then no se realiza la eliminación.
    await expectAsync(ds.deleteDevice(id)).toBeRejectedWith(new DeviceNotExists(id))
  });

  afterEach(() => {
    //limpiarEstado();
  });
});