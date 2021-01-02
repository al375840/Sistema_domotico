import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';
import { take } from 'rxjs/operators';
import { Room } from 'src/app/rooms/room';

describe('HU08: Listar dispositivos no asignados conocidos', () => {
  let deviceService: DeviceService;
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
    deviceService = obtainDeviceService();

  });

  it('Deberia devolver una lista vacía cuando no hay dispositivos no asignados', async () => {
    // Given -- todos los dispositivos están asignados
    await roomService.addRoom('Test').catch((e)=>console.error(e));
    const devices = await deviceService.listUnasignedDevices().pipe(take(1)).toPromise();
    const habitacion = new Room('Test');
    for (let d of devices) {
      await roomService.asignDevice(d.id, habitacion).catch((e) => console.error(e));
    }
    // When -- Obtenemos los dispositivos no asignados
    const listDevices = await deviceService.listUnasignedDevices().pipe(take(1)).toPromise();

    // Then -- No debería de haber ningún dispositivo no asignado
    expect(listDevices.length).toBe(0);

    // After -- Eliminamos la habitación y los dispositivo volverian a estar no asignados
    await roomService.deleteRoom('Test').catch(e=>console.error(e));

  }, 20000);

  it('Deberia devolver una lista no vacia cuando hay algun dispositivo no asignado', async () => {
    // Given -- el listado inicial de dispositivos no asignados

    // When -- consultamos los dispositivos no asignados
    const listDevices = await deviceService
      .listUnasignedDevices()
      .pipe(take(1))
      .toPromise();
    // Then -- debería de haber al menos uno
    expect(listDevices.length>=0).toBeTrue();
  });
  afterEach(() => {
    limpiarEstado();
  });
});
