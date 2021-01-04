
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { Device } from 'src/app/devices/device';
import { DeviceService } from 'src/app/devices/device.service';
import { DeviceType } from 'src/app/devices/enums/typeEnum';
import { STORAGE } from 'src/app/localstorage/i-local-storage';
import { LocalStorageService } from 'src/app/localstorage/localstorage.service';
import { SERVER_SERVICE } from 'src/app/server/i-server';
import { ServerService } from 'src/app/server/server.service';

describe('HUH04: Guardar informacion de los dispositivos del HUB', () => {
  let ds: DeviceService | undefined
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SERVER_SERVICE, useClass: ServerService }, { provide: STORAGE, useClass: LocalStorageService }],
    });
    ds = TestBed.inject(DeviceService);
  });

  it('Debería de conservar los cambios de estado de un dispositivo', async () => {
    //Given uno de los dispositivos que tiene el hub por defecto
    const deviceId = "FEN"
    await ds?.switchDeviceTurned(deviceId, false)
    //When el usuario los desconecta y cierra el hub
    ds = undefined;
    ds = TestBed.inject(DeviceService);
    //Then al volver a conectarse se devería de visualizar su estado cambiado
    const device = await ds.getDevice(deviceId)
    expect(device.turned).toBeFalse();
    
    //After
    await ds?.switchDeviceTurned(deviceId, true)
  });

  it('Deberia poder listar dispositivos con un nuevo dispositivo creado', async () => {
    //Given uno de los dispositivos que tiene el hub por defecto
    const deviceId = await ds?.addDevice(DeviceType.MOVIMIENTO)
    //When el usuario los desconecta y cierra el hub
    ds = undefined;
    ds = TestBed.inject(DeviceService);
    //Then al volver a conectarse se devería de visualizar su estado cambiado
    if (deviceId) {
      let devices = await ds.getDevices().pipe(take(1)).toPromise()
      let device = devices.find((d) => d.id == deviceId)
      expect(device).toBeDefined();

      //After
      await ds.deleteDevice(deviceId);
    }
    else {
      fail()
    }

  });

  afterEach(() => {
    //limpiarEstado();
  });
});