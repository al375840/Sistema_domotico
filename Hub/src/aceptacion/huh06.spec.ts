
import {take} from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { initializeTestBed, obtainDeviceService } from './comun';

describe('HUH06: Listar los dispositivos', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });

  it('Deberia poder listar los dispositivos con al menos un dispositivo', async () => {
    //Given una lista de dispositivos con al menos un dispositivo.
    //When el usuario la lista. 
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    //Then se lista los dispositivos.
    expect(devices instanceof Array).toBeTruthy();
  });

  it('Deberia poder listar los dispositivos con un nuevo dispositivo añadido', async () => {
    //Given una lista de dispositivos sin ningun dispositivo
    const type:DeviceType = DeviceType.MOVIMIENTO
    const device = await ds.addDevice(type).catch((e) => {console.error(e)})
    //When el usuario la lista. 
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    //Then se lista los dispositivos.
    const addedDevice: Device | undefined = devices.find((d) => d.id == device);
    expect(addedDevice).toBeDefined();

    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch((e) => {console.error(e)})
    }
  });

  afterEach(() => {
    //limpiarEstado();
  });
});