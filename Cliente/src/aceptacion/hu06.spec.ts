import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';

describe('HU06: Consultar dispositivos asignados a una habitacion', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder añadir haibitaciones con un nombre correcto', async () => {
    
    
  });

  it('No deberia poder añadir haibitaciones con un nombre no valido', async () => {
   

  });

  afterEach(() => {
    limpiarEstado();
  });
});