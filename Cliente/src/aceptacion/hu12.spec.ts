import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';

describe('HU12: Listar habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder listar todas las habitaciones ', async () => {
        // Given -- una lista de habitaciones

        // When --  el usuario cambia su nombre
        const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
        // Then -- se registra la habitación.
        expect(habitaciones instanceof Array).toBeTruthy();
        
    
  });

  it('Deberia poder listar todas las habitaciones despues de añadir una habitación', async () => {
        // Given -- una etiqueta vacía.
        // When -- el usuario cambia el nombre.
        // Then -- no se registra la habitación.
        //After
  });

  afterEach(() => {
    limpiarEstado();
  });
});