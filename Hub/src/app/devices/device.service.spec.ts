import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ILocalStorage, STORAGE } from '../localstorage/i-local-storage';
import { IServer, SERVER_SERVICE } from '../server/i-server';
import { Device } from './device';
import { DeviceService } from './device.service';
import { DeviceType } from './enums/typeEnum';
import { UpdateAlarm } from './others/IUpdateAlarm';

describe('DeviceService', () => {
  let service: DeviceService;
  let mockServer: jasmine.SpyObj<IServer>;
  let mockStorage: jasmine.SpyObj<ILocalStorage>;
  let topicoServidor: Subject<UpdateAlarm>;
  beforeEach(() => {
    [mockServer, topicoServidor] = creaMockServerService();
    mockStorage = creaMockLocalStorageService();
    TestBed.configureTestingModule({
      providers: [
        { provide: SERVER_SERVICE, useValue: mockServer },
        { provide: STORAGE, useValue: mockStorage },
      ],
    });

    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Debería de cambiar el estado de los dispositivos que le indica el servidor', fakeAsync(() => {
    topicoServidor.next({ turnOn: ['MCU'], turnOff: [] });
    tick();

    expect(mockStorage.updateDevice.calls.count()).toEqual(1);
    expect(mockStorage.updateDevice.calls.first().args[0].id).toEqual('MCU');
  }));
});
function creaMockServerService(): [
  jasmine.SpyObj<IServer>,
  Subject<UpdateAlarm>
] {
  const topicoServidor = new Subject<UpdateAlarm>();
  const mock = jasmine.createSpyObj('ServerService', [
    'getAlarmChanges$',
    'setServerState',
    'addDevice',
    'updateDevice',
    'deleteDevice',
  ]);
  mock.getAlarmChanges$.and.returnValue(topicoServidor.asObservable());
  mock.setServerState.and.returnValue();
  mock.addDevice.and.returnValue();
  mock.updateDevice.and.returnValue();
  mock.deleteDevice.and.returnValue();
  return [mock, topicoServidor];
}
function creaMockLocalStorageService(): jasmine.SpyObj<ILocalStorage> {
  const mock = jasmine.createSpyObj('LocalStorageService', [
    'updateDevice',
    'addDevice',
    'getDevice',
    'getDevices',
  ]);
  mock.updateDevice.and.returnValue(
    new Promise<boolean>((resolve) => {
      resolve(true);
    })
  );
  mock.addDevice.and.returnValue(
    new Promise<string>((resolve) => {
      resolve('MCU');
    })
  );
  mock.getDevice.and.returnValue(
    new Promise<Device>((resolve) => {
      resolve({
        id: 'MCU',
        type: DeviceType.ALARMA,
        state: 'ON',
        turned: true,
      });
    })
  );
  const s = new Subject<Device>();
  mock.getDevices.and.returnValue(s.asObservable());
  return mock;
}
