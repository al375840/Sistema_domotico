import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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
  it('Debería de cambiar el estado de los dispositivos que le indica el servidor', fakeAsync (() => {

    topicoServidor.next(
      {turnOn:['MCU'],
    turnOff:[]}
    )
    tick()

   expect(mockStorage.updateDevice.calls.count()).toEqual(1);
   expect(mockStorage.updateDevice.calls.first().args[0].id).toEqual('MCU');
  }));
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
function creaMockLocalStorageService(): jasmine.SpyObj<ILocalStorage> {
  const mock = jasmine.createSpyObj('LocalStorageService', ['updateDevice', 'addDevice', 'getDevice', 'getDevices']);
  mock.updateDevice.and.returnValue(new Promise<boolean>((resolve) => {resolve(true)}))
  mock.addDevice.and.returnValue(new Promise<string>((resolve) => {resolve('MCU')}))
  mock.getDevice.and.returnValue(new Promise<Device>((resolve) => {resolve({id: 'MCU', type:DeviceType.ALARMA, state:'ON', turned:true})}))
  const s = new Subject<Device>();
  mock.getDevices.and.returnValue(s.asObservable())
  return mock;
}