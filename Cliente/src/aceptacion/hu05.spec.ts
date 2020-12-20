import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainRoomService } from './comun';
import { take } from 'rxjs/operators';
import { Room } from 'src/app/rooms/room';
import { NameNotValid } from 'src/app/rooms/exceptions/name-not-valid';

describe('HU05: Quitar un dispositivo a una habitacion', () => {
    let roomService: RoomService;

    beforeEach(() => {
        initializeTestBed();
        roomService = obtainRoomService();
    });

    it('Deberia poder desasignar un dispositivo asignado previamente a una habitacion', async () => {
        // Given -- 
        // When -- 
        // Then -- 
    });

    it('No deberia poder desasignar un dispositivo de una habitacion sin dispositivos', async () => {
        // Given -- 
        // When -- 
        // Then -- se asignará a la habitación el dispositivo
    });

        afterEach(() => {
        limpiarEstado();
    });
});