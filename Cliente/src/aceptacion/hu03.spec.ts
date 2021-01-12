import { RoomNotExists } from 'src/app/rooms/exceptions/room-not-exists';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainRoomService } from './comun';

describe('HU03: Eliminar habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder eliminar una habitacion existente', async () => {
        // Given -- un nombre de habitación válida.
        const nombre = "Test"
        await roomService.addRoom(nombre).catch(()=>{});
        // When --  el usuario la elimina
        await roomService.deleteRoom(nombre).catch(()=>{});
        // Then -- se borra del registro.
        await expectAsync(roomService.getRoom(nombre)).toBeRejectedWith(new RoomNotExists(nombre));
        
  });

  it('No deberia poder eliminar una habitacion no existente', async () => {
        // Given -- una habitacion que no existe.
        const nombre = "FakeRoom"
        // When -- el usuario la borra.
        // Then -- lanza la excepcion correspondiente.
        await expectAsync(roomService.deleteRoom(nombre)).toBeRejectedWith(new RoomNotExists(nombre));
  });

  afterEach(() => {
    limpiarEstado();
  });
});