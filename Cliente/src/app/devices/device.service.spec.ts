import { TestBed } from '@angular/core/testing';
import { IServer, SERVER_SERVICE } from '../comun/i-server';

import { DeviceService } from './device.service';
import { Subject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { DeviceType } from '../enums/typeEnum';
import { Device } from './device';

describe('DeviceService', () => {
  let service: DeviceService;
  let mockServer: jasmine.SpyObj<IServer>;
  let topicoServidor: Subject<Array<Device>>;

  beforeEach(() => {
    [mockServer, topicoServidor] = creaMockServerService();
    TestBed.configureTestingModule({
      providers: [{ provide: SERVER_SERVICE, useValue: mockServer }],
    });
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('debería de ordenar los dispositivos no asignados por tipo', async() => {
    const ld = service
      .listUnasignedDevices()
      .pipe(take(4), toArray())
      .toPromise();
    topicoServidor.next([
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
    ]);
    topicoServidor.next([
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
    ]);
    topicoServidor.next([
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
      { id: 'ASS', type: DeviceType.ALARMA, state: 'OFF', turned: false },
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
      { id: 'SAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
    ]);
    topicoServidor.next([
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
      { id: 'ASS', type: DeviceType.ALARMA, state: 'OFF', turned: false },
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
      { id: 'EEE', type: DeviceType.MOVIMIENTO, state: 'NO_MOTION', turned: true },
      { id: 'SAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
    ]);
    const devices = await ld;
    expect(devices[0]).toEqual([
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
    ]);
    expect(devices[1]).toEqual([
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
    ]);
    expect(devices[2]).toEqual([
      { id: 'SAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
      { id: 'ASS', type: DeviceType.ALARMA, state: 'OFF', turned: false },
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
    ]);
    expect(devices[3]).toEqual([
      { id: 'SAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
      { id: 'ZZZ', type: DeviceType.APERTURA, state: 'CLOSE', turned: true },
      { id: 'EEE', type: DeviceType.MOVIMIENTO, state: 'NO_MOTION', turned: true },
      { id: 'ASS', type: DeviceType.ALARMA, state: 'OFF', turned: false },
      { id: 'ZAA', type: DeviceType.APERTURA, state: 'CLOSE', turned: false },
    ]);
  });
});
function creaMockServerService(): [
  jasmine.SpyObj<IServer>,
  Subject<Array<Device>>
] {
  const topicoServidor = new Subject<Array<Device>>();
  const mock = jasmine.createSpyObj('ServerService', ['listUnasignedDevices']);
  mock.listUnasignedDevices.and.returnValue(topicoServidor.asObservable());
  return [mock, topicoServidor];
}
