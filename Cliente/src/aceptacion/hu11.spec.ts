import {RoomService} from '../app/rooms/room.service';
import {initializeTestBed, limpiarEstado, obtainRoomService} from './comun';
import {take} from 'rxjs/operators';
import {Room} from 'src/app/rooms/room';
import {NameNotValid} from 'src/app/rooms/exceptions/name-not-valid';
import { TestBed } from '@angular/core/testing';

describe('HU11: Guardar información de habitaciones', () => {
  let roomService: RoomService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [RoomService],
      });
      roomService = TestBed.inject(RoomService);
  });

  it('Deberia poder listar habitaciones creadas previamente', async () => {
    const nombre = "Persistencia"
    await roomService.addRoom(nombre).catch((e)=>{});
    //Cerramos aplicacion
    roomService = null;
    //Abrimos aplicacion
    roomService = TestBed.inject(RoomService);
    const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
    // Then -- la lista de habitaciones contiene la nueva habitacion.
    let room: Room | undefined = habitaciones.find((r)=>r.name == nombre)
    expect(room).toBeDefined();

    await roomService.deleteRoom(nombre).catch((e)=>{});
  });

  it('Deberia poder listar habitaciones con sus dispositivos', async () => {
      
  });

  afterEach(() => {
    limpiarEstado();
  });
});