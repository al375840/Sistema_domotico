import { RoomNotExists } from 'src/app/rooms/exceptions/room-not-exists';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainRoomService } from './comun';

describe('HU06: Consultar dispositivos asignados a una habitacion', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder consultar los dispositivos de una habitación que existe y tiene dispositivos asignados', async () => {
        // Given -- una habitación con dispositivos asignados.
        const roomname = 'TEST'
        await roomService.addRoom(roomname).catch((e)=>console.error(e))
        const deviceId = 'FEN'
        const room = await roomService.getRoom(roomname)
        await roomService.asignDevice(deviceId, room).catch((e)=>console.error(e))
        // When -- quiere listar los dispositivos de la habitación.
        const roomafter = await roomService.getRoom(roomname)
        // Then --  se mostrará una lista con todos los dispositivos de la habitación.
        expect(roomafter.devices).toBeDefined()
        await roomService.deleteRoom(roomname).catch((e)=>console.error(e))

  });

  it('No deberia poder consultar los dispositivos de una habitación que no existe', async () => {
        // Given -- una habitación que no existe.
        // When -- quiere listar los dispositivos de la habitación.
        const room = 'TEST'
        // Then --  no se mostrará ninguna lista, y se notificará que esa habitación no existe.
        await expectAsync(roomService.getRoom(room)).toBeRejectedWith(new RoomNotExists(room));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
