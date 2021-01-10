import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { SERVER_SERVICE, IServer } from '../comun/i-server';
import { ServerService } from '../comun/server.service';
import { Room } from './room';

import { RoomService } from './room.service';
import { take, toArray } from 'rxjs/operators';
import { DeviceType } from '../enums/typeEnum';

describe('RoomService', () => {
  let service: RoomService;
  let mockServer: jasmine.SpyObj<IServer>;
  let topicoServidor: Subject<Array<Room>>;

  beforeEach(() => {
    [mockServer, topicoServidor] = creaMockServerService();
    TestBed.configureTestingModule({
      providers: [{ provide: SERVER_SERVICE, useValue: mockServer }],
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('debería devolver un listado de las habitaciones con alarmas activas', async () => {
    const listadoHabitaciones = service
      .getRooms()
      .pipe(take(4), toArray())
      .toPromise();
    topicoServidor.next([{ name: 'Z', devices: [] }]);
    topicoServidor.next([
      { name: 'Z', devices: [] },
      { name: 'B', devices: [] },
    ]);
    topicoServidor.next([
      { name: 'Z', devices: [] },
      { name: 'B', devices: [] },
      { name: 'C', devices: [] },
    ]);
    topicoServidor.next([
      { name: 'Z', devices: [] },
      { name: 'B', devices: [] },
      { name: 'C', devices: [] },
      { name: 'A', devices: [] },
    ]);
    const estados = await listadoHabitaciones;
    expect(estados[0]).toEqual([{ name: 'Z', devices: [] }]);
    expect(estados[1]).toEqual([
      { name: 'B', devices: [] },
      { name: 'Z', devices: [] },
    ]);
    expect(estados[2]).toEqual([
      { name: 'B', devices: [] },
      { name: 'C', devices: [] },
      { name: 'Z', devices: [] },
    ]);
    expect(estados[3]).toEqual([
      { name: 'A', devices: [] },
      { name: 'B', devices: [] },
      { name: 'C', devices: [] },
      { name: 'Z', devices: [] },
    ]);
  });

  it('debería devolver un listado de las habitaciones con alarmas activas', async () => {
    const estadosDetectados = service
      .getRoomsWithAlarms()
      .pipe(take(9), toArray())
      .toPromise();

    // Simulación de un sensor activandose en una habitación
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: true,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'MOTION_DETECTED',
            turned: true,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'ON', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'MOTION_DETECTED',
            turned: true,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'ON', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: true,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: true,
          },
        ],
      },
    ]);

    // Comporbamos como se comprota si se desconecta un sensor de la habitación
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: false,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'ON', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: false,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'ON', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: true,
          },
        ],
      },
    ]);
    topicoServidor.next([
      {
        name: 'jardin',
        devices: [
          { id: 'AAA', type: DeviceType.ALARMA, state: 'OFF', turned: true },
          {
            id: 'OAA',
            type: DeviceType.MOVIMIENTO,
            state: 'NO_MOTION',
            turned: true,
          },
        ],
      },
    ]);
    const estados = await estadosDetectados;
    expect(estados[0]).toEqual([]);
    expect(estados[1]).toEqual([]);
    expect(estados[2]).toEqual(['jardin']);
    expect(estados[3]).toEqual(['jardin']);
    expect(estados[4]).toEqual([]);
    expect(estados[5]).toEqual([]);
    expect(estados[6]).toEqual(['jardin']);
    expect(estados[7]).toEqual(['jardin']);
    expect(estados[8]).toEqual([]);
  });
});

function creaMockServerService(): [
  jasmine.SpyObj<IServer>,
  Subject<Array<Room>>
] {
  const topicoServidor = new Subject<Array<Room>>();
  const mock = jasmine.createSpyObj('ServerService', ['getRooms']);
  mock.getRooms.and.returnValue(topicoServidor.asObservable());
  return [mock, topicoServidor];
}
