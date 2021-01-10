import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { STORAGE, ILocalStorage } from '../localstorage/i-local-storage';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { IServer, SERVER_SERVICE } from '../server/i-server';
import { ServerService } from '../server/server.service';
import { Device } from './device';

import { DeviceService } from './device.service';
import { DeviceType } from './enums/typeEnum';
import { UpdateAlarm } from './others/IUpdateAlarm';
import { take, toArray } from 'rxjs/operators';

describe('DeviceService', () => {
  let service: DeviceService;
  let mockServer: jasmine.SpyObj<IServer>;
  let mockStorage: jasmine.SpyObj<ILocalStorage>;
  let topicoServidor: Subject<UpdateAlarm>;
  let topicoStorage: Subject<Device>;
  beforeEach(() => {
    [mockServer, topicoServidor] = creaMockServerService();
    //[mockStorage,topicoStorage] = creaMockLocalStorageService();
    TestBed.configureTestingModule({
      providers: [
        { provide: SERVER_SERVICE, useValue: mockServer },
        { provide: STORAGE, useClass:LocalStorageService },
      ],
    });

    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Debería de cambiar el estado de los dispositivos que le indica el servidor', async () => {
    let aux = service.getDevices().pipe(take(2),toArray()).toPromise()
    topicoServidor.next(
      {turnOn:['MCU'],
    turnOff:[]}
    )
    let devices = await aux
    let device = devices[1].find(d=>d.id == 'MCU')
    expect(device?.state).toEqual('ON')
   
  });
});
function creaMockServerService(): [
  jasmine.SpyObj<IServer>,
  Subject<UpdateAlarm>
] {
  const topicoServidor = new Subject<UpdateAlarm>();
  const mock = jasmine.createSpyObj('ServerService', ['getAlarmChanges$','setDeviceList']);
  mock.getAlarmChanges$.and.returnValue(topicoServidor.asObservable());
  mock.setDeviceList.and.returnValue();
  return [mock, topicoServidor];
}
function creaMockLocalStorageService(): [jasmine.SpyObj<ILocalStorage>,Subject<Device>] {
  const topicoStorage = new Subject<Device>();
  const mock = jasmine.createSpyObj('LocalStorageService', ['getDevices']);
  mock.getDevices.and.returnValue(topicoStorage.asObservable());
  return [mock,topicoStorage];
}