import { Device } from 'src/app/devices/device';
import { AsignFailed } from 'src/app/rooms/exceptions/asign-failed';
import { Room } from 'src/app/rooms/room';
import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';

describe('HU04: Asignar un dispositivo a una habitacion', () => {
  let roomService: RoomService;
  let deviceService: DeviceService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
    deviceService = obtainDeviceService();
  });

  it('Deberia poder asignar el dispositivo a la haibitacion si la habitacion existe', async () => {
    // Given -- una habitación y un dispositivo que no pertenece a una habitación
    const nombre = "Test"
    await roomService.addRoom(nombre).catch((e)=>{});
    const deviceId = "FEN"
    await deviceService.unasignDevice(deviceId).catch(() => {});
    var room = await roomService.getRoom(nombre);

    // When -- el usuario quiera añadir ese dispositivo a la habitación
    await roomService.asignDevice(deviceId, room);
    
    // Then -- se asignará a la habitación el dispositivo
    room = await roomService.getRoom(nombre);
    let device: Device | undefined = room.devices.find(d=>d.id == deviceId);

    expect(device).toBeDefined()
    
    //After
    await roomService.deleteRoom(nombre).catch(()=>{});
  });

  it('No deberia poder asignar el dispositivo a la haibitacion si la habitacion NO existe', async () => {
   // Given -- una habitación que no existe y un dispositivo que no pertenece a una habitación
  const nombre = "Fake"
  const deviceId = "FEN"
  await deviceService.unasignDevice(deviceId).catch(() => {});;
  var room: Room = new Room(nombre);

  // When -- el usuario quiera añadir ese dispositivo a la habitación
  // Then -- se lanzará la excepción correspondiente
  await expectAsync(roomService.asignDevice(deviceId, room)).toBeRejectedWith(new AsignFailed(nombre, deviceId));

  });

  afterEach(() => {
    limpiarEstado();
  });
});