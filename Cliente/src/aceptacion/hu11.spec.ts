import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';
import { TestBed } from '@angular/core/testing';
import { Device } from 'src/app/devices/device';
import { DeviceService } from '../app/devices/device.service';
import {ServerService} from '../app/comun/server.service';
import { SERVER_SERVICE } from 'src/app/comun/i-server';

describe('HU11: Guardar información de habitaciones', () => {
  let roomService: RoomService;
  let deviceService: DeviceService;
  let tb;
  beforeEach(() => {
    tb = TestBed.configureTestingModule({
      providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}],
    });
    roomService = tb.inject(RoomService);
    deviceService = tb.inject(DeviceService);
  });

  it('Deberia poder listar habitaciones creadas previamente', async () => {
    const nombre = 'Persistencia';
    roomService = tb.inject(RoomService);
    await roomService.addRoom(nombre).catch((e) => {console.error(e); });
    // Cerramos aplicacion
    roomService = null;
    // Abrimos aplicacion
    roomService = TestBed.inject(RoomService);
    const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
    // Then -- la lista de habitaciones contiene la nueva habitacion.
    const room: Room | undefined = habitaciones.find((r) => r.name == nombre);
    expect(room).toBeDefined();

    await roomService.deleteRoom(nombre).catch((e) => {console.error(e); });
  });

  it('Deberia poder listar habitaciones con sus dispositivos', async () => {
    const nombre = 'Persistencia';
    await roomService.addRoom(nombre).catch((e) => {console.error(e); });
    const deviceId = 'FEN';
    await deviceService.unasignDevice(deviceId).catch((e) => {console.error(e); });
    const room = await roomService.getRoom(nombre);
    await roomService.asignDevice(deviceId, room).catch((e) => {console.error(e); });
    // Cerramos aplicacion
    roomService = null;
    // Abrimos aplicacion
    roomService = TestBed.inject(RoomService);
    const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
    // Then -- la lista de habitaciones contiene la nueva habitacion.
    const prevRoom: Room | undefined = habitaciones.find((r) => r.name == nombre);
    expect(prevRoom).toBeDefined();
    const prevdevice: Device | undefined = prevRoom.devices.find((d) => d.id == deviceId);
    expect(prevdevice).toBeDefined();

    await roomService.deleteRoom(nombre).catch((e) => {});
  });

  afterEach(() => {
    limpiarEstado();
  });
});
