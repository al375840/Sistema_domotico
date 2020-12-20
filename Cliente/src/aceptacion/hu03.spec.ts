import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import { RoomNotExists } from 'src/app/rooms/exceptions/room-not-exists';

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
        await roomService.deleteRoom(nombre);
        // Then -- se borra del registro.
        const habitacion = await roomService.getRoom(nombre);
        expect(habitacion).toBeUndefined();
        //After
        await roomService.deleteRoom(nombre).catch(()=>{});
        
  });

  it('No deberia poder eliminar una habitacion no existente', async () => {
        // Given -- una habitacion que no existe.
        const nombre = "Test"
        await roomService.deleteRoom(nombre).catch(()=>{});
        // When -- el usuario la borra.
        // Then -- lanza la excepcion correspondiente.
        await expectAsync(roomService.deleteRoom(nombre)).toBeRejectedWith(new RoomNotExists(nombre));
  });

  afterEach(() => {
    limpiarEstado();
  });
});