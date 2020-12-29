
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
    const id = await ds.addDevice(type)

    //When el usuario lo modifica.
    await ds.switchDeviceState(id, "MOTION_DETECTED").catch(() => {})
    //Then se realiza el cambio.
    let addedDevice = await ds.getDevice(id).catch(e=>{console.log(e); return {}as Device;})
    expect(addedDevice.state == "MOTION_DETECTED").toBeTrue();

    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch((e) => {console.error(e)})
    }

  });

  it('No deberia poder modificar un dispositivo que no exista', async () => {
    //Given  el identificador del dispositivo que no existe.
    const device = "TEST"

    //When  el usuario lo modifica.
    //Then  se realiza el cambio.
    await expectAsync(ds.switchDeviceState(device, "MOTION_DETECTED")).toBeRejectedWith(new DeviceNotExists(device))
  });

  afterEach(() => {
    //limpiarEstado();
  });
});
