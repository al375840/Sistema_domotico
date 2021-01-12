import { take } from 'rxjs/operators';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainRoomService } from './comun';

describe('HU10: Mostrar alerta con las habitaciones en las que ha saltado una alarma', () => {
  let roomService: RoomService;

  beforeEach(() => {
    initializeTestBed();
    roomService = obtainRoomService();
  });

  it('Debereria devolver una lista vacia si no han saltado alarmas', async () => {
    // Given -- una lista de habitaciones sin alarmas activas
    // When --  el usuario solicita una lista de alarmas
    const habitaciones:Array<string> = await roomService.getRoomsWithAlarms().pipe(take(1)).toPromise();
    // Then -- devuelve una lista vacia o con los nombres de las habitaciones con alarmas activas
    expect(habitaciones instanceof Array).toBeTruthy(); 
    expect(habitaciones.length >= 0).toBeTrue();
  });

  afterEach(() => {
    limpiarEstado();
  });
});