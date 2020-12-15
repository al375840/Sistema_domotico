import { take } from 'rxjs/operators';
import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';

describe('HU09: Actualizar dispositivos no asignados ', () => {
  let deviceService: DeviceService;
  let roomService: RoomService;

  beforeEach(() => {
    deviceService = obtainDeviceService();
    roomService = obtainRoomService();
  });

  it('Deberia poder actualizar la lista con los cambios realizados', async () => {
    // Given -- tenemos uno de los dispositivos por defecto a asignado en una habitación

    roomService.addRoom('Test');
    const id = 'FEN';
    roomService.asignDevice(id, 'Test');

    // When -- eliminamos la habitación y por lo tanto el dispositivo se desasigna

    roomService.deleteRoom('Test');

    // Then -- el dispositivo con id 'CAS' Debería de estar en la lista de dispo
    const newListDevices = await deviceService
      .listUnasignedDevices()
      .pipe(take(1))
      .toPromise();

    expect(newListDevices.some((d) => d.id == 'FEN')).toBeTrue();
  });

  it('Deberia poder mostrar los dispositivos no asignados sin cambios', async () => {
    // Given -- tenemos uno de los dispositivos por defecto a asignado en una habitación
    roomService.addRoom('Test');
    const id = 'FEN';
    roomService.asignDevice(id, 'Test');

    // When -- listamos todos los dispositivos no asignados
    const listDevices = await deviceService
      .listUnasignedDevices()
      .pipe(take(1))
      .toPromise();

    // Then -- no debería de estar el dispositivo asignado a la habitación
    expect(listDevices.some((d) => d.id == 'FEN')).not.toBeTrue();

    // After -- Devolvemos el estado inicial
    roomService.deleteRoom('Test');
  });
  afterEach(() => {
    limpiarEstado();
  });
});
