import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';
import { take } from 'rxjs/operators';

describe('HU08: Listar dispositivos no asignados conocidos', () => {
  let deviceService: DeviceService;
  let roomService: RoomService;

  beforeEach(() => {
    deviceService = obtainDeviceService();
  });

  it('Deberia devolver una lista vacía cuando no hay dispositivos no asignados', async () => {
    // Given -- todos los dispositivos están asignados
    roomService = obtainRoomService();

    roomService.addRoom('Test');
    const devices = await deviceService
      .listUnasignedDevices()
      .pipe(take(1))
      .toPromise();
    devices.forEach((d) => roomService.asignDevice(d.id, 'Test'));

    // When -- Obtenemos los dispositivos no asignados
    const listDevices = await deviceService.listUnasignedDevices().pipe(take(1)).toPromise();

    // Then -- No debería de haber ningún dispositivo no asignado
    expect(listDevices.length).toBe(0);

    // After -- Eliminamos la habitación y los dispositivo volverian a estar no asignados
    roomService.deleteRoom('Test');
  });

  it('Deberia devolver una lista no vacia cuando hay algun dispositivo no asignado', async () => {
    // Given -- el listado inicial de dispositivos no asignados

    // When -- consultamos los dispositivos no asignados
    const listDevices = await deviceService
      .listUnasignedDevices()
      .pipe(take(1))
      .toPromise();

    // Then -- debería de haber al menos uno
    expect(listDevices.length).toBeGreaterThan(0);
  });
  afterEach(() => {
    limpiarEstado();
  });
});
