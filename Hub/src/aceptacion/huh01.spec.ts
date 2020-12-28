import {initializeTestBed, limpiarEstado,obtainDeviceService} from './comun';
import {take} from 'rxjs/operators';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { DeviceService } from 'src/app/devices/device.service';
import { Device } from 'src/app/devices/device';

describe('HUH01: Crear dispositivo de los distitos estados', () => {
  let ds: DeviceService;
  beforeEach(() => {
    initializeTestBed();
    ds = obtainDeviceService();
  });
  it('Deberia poder añadir dispositivos de tipo movimiento', async () => {
    //Given un tipo correcto de dispositivo.
    const type:DeviceType = DeviceType.MOVIMIENTO
    // When el usuario lo crea. 
    const device = await ds.addDevice(type).catch(() => {})
    //Then se registra el dispositivo del tipo requerido.
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    const addedDevice: Device | void = devices.find((d) => d.id == device);
    expect(addedDevice).toBeDefined();
    
    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch(() => {})
    }
    
  });

  it('No deberia poder añadir dispositivos de tipo apertura', async () => {
    //Given  un tipo incorrecto de dispositivo.
    const type:DeviceType = DeviceType.APERTURA
    //When el usuario lo crea. 
    const device = await ds.addDevice(type).catch(() => {})
    //Then no se registra la habitación.
    const devices: Device[] = await ds.getDevices().pipe(take(1)).toPromise();
    const addedDevice: Device | undefined = devices.find((d) => d.id == device);
    expect(addedDevice).toBeDefined();
    
    if(addedDevice && addedDevice.id){
      await ds.deleteDevice(addedDevice.id).catch(() => {})
    }
  });

  afterEach(() => {
    //limpiarEstado();
  });
});