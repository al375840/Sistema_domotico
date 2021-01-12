import { take } from 'rxjs/operators';
import { Room } from 'src/app/rooms/room';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainRoomService } from './comun';

describe('HU12: Listar habitaciones', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Deberia poder listar todas las habitaciones ', async () => {
        // Given -- una lista de habitaciones

        // When --  el usuario las lista
        const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
        // Then -- hay habitaciones.
        expect(habitaciones instanceof Array).toBeTruthy();  
    
  });

  it('Deberia poder listar todas las habitaciones despues de añadir una habitación', async () => {
        // Given -- una lista de habitaciones y una nueva habitacion.
        const nombre = "Test"
        await roomService.addRoom(nombre).catch((e)=>{});
        // When -- el usuario las lista
        const habitaciones = await roomService.getRooms().pipe(take(1)).toPromise();
        // Then -- la lista de habitaciones contiene la nueva habitacion.
        let room: Room | undefined = habitaciones.find((r)=>r.name == nombre)
        expect(room).toBeDefined();
        //After
        await roomService.deleteRoom(nombre).catch(()=>{});
  });

  afterEach(() => {
    limpiarEstado();
  });
});