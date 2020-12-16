import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';
import { take } from 'rxjs/operators';
import { Room } from 'src/app/rooms/room';
import { NameNotValid } from 'src/app/rooms/exceptions/name-not-valid';

describe('HU01: Añadir habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed()
    roomService = obtainRoomService();
  });

  it('Deberia poder añadir haibitaciones con un nombre correcto', async () => {
    //Given -- Un nombre de habitación correcto (Salon)
    let nombre = 'Salon'

    //When -- añadimos con nombre concreto
    roomService.addRoom(nombre);

    //Then --se debería de haber creado la habitación con nombre salon
    expect((await roomService.getRoom(nombre).pipe(take(1)).toPromise()).name == 'Salon').toBeTrue();
});

  it('No deberia poder añadir haibitaciones con un nombre no valido', async () => {
    let nombre = ''

    //When -- añadimos con nombre concreto

    //Then --
    await expectAsync(roomService.addRoom(nombre)).toBeRejectedWith(new NameNotValid(nombre));
    
  });

  afterEach(() => {
    limpiarEstado();
  });
});
