import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';
import { UpdateFailed } from 'src/app/rooms/exceptions/update-failed';

describe('HU02: Modificar habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder cambiar el nombre de una habitacion con un nombre valido', async () => {
        // Given -- un nombre de habitación válida.
        const nombre = "Test"
        await roomService.addRoom(nombre).catch(()=>{});
        const newname = "NewTestName"
        // When --  el usuario cambia su nombre
        await roomService.updateRoom(nombre, newname).catch(() => {});
        // Then -- se registra la habitación.
        const habitacion = await roomService.getRoom(newname);
        expect(habitacion.name == newname).toBeTrue();
        //After
        await roomService.deleteRoom(newname).catch(async()=>{
            await roomService.deleteRoom(nombre).catch(()=>{});
        });
        
  });

  it('No deberia poder cambiar el nombre de una habitacion con un nombre invalido', async () => {
        // Given -- una etiqueta vacía.
        const nombre = "Test"
        await roomService.addRoom(nombre).catch(()=>{});
        const newname = ""
        // When -- el usuario cambia el nombre.
        // Then -- lanza la excepcion corresopndiente.
        await expectAsync(roomService.updateRoom(nombre, newname)).toBeRejectedWith(new UpdateFailed(nombre, newname));
        //After
        await roomService.deleteRoom(newname).catch(async()=>{
          await roomService.deleteRoom(nombre).catch(()=>{});
      });
  });

  afterEach(() => {
    limpiarEstado();
  });
});