import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';

describe('HU01: Añadir habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder añadir haibitaciones con un nombre correcto', async () => {
    // Given -- Un nombre de habitación correcto (Salon)
    const nombre = 'Salon';

    // When -- añadimos con nombre concreto
    await roomService.addRoom(nombre).catch((e)=>{});

    //Then --se debería de haber creado la habitación con nombre salon
    var room = await roomService.getRoom(nombre).pipe(take(1)).toPromise();
    expect(( room.name== 'Salon')).toBeTrue();

    //After -- quitamos la habitación que hemos creado
    await roomService.deleteRoom(nombre);
  });

  it('No deberia poder añadir haibitaciones con un nombre no valido', async () => {
    //Given -- Un nombre de habitación incorrecto
    const nombre = '';

    //When -- Añadimos una habitación con ese nombre

    //Then -- Debería de producirse una excepción indicando que el nombre no es válido
    await expectAsync(roomService.addRoom(nombre)).toBeRejectedWith(new NameNotValid(nombre));

  });

  afterEach(() => {
    limpiarEstado();
  });
});
