import {DeviceService} from '../app/devices/device.service';
import {Device} from '../app/devices/device';
import {Room} from '../app/rooms/room';
import {RoomService} from '../app/rooms/room.service';
import {DeviceNotExists} from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService, obtainRoomService } from './comun';

describe('HU09: Actualizar dispositivos no asignados ', () => {
    let deviceService: DeviceService;
    let roomService: RoomService;

    beforeEach(() => {
        deviceService = obtainDeviceService();
    });

    it('Deberia poder actualizar la lista con los cambios realizados',
     async () => {
         //Given -- Tenemos uno de los dispositivos por defecto a una habitación 
         roomService = obtainRoomService();

         roomService.addRoom("Test")
         const id = "CAS"
         roomService.asignDevice(id,"Test");
         const listDevices = await deviceService.listUnasignedDevices().toPromise();
         
         
         //When -- Eliminamos la habitación y por lo tanto el dispositivo se desasigna

         roomService.deleteRoom("Test");

         //Then -- El dispositivo con id 'CAS' Debería de estar en la lista de dispo
         const newListDevices = await deviceService.listUnasignedDevices().toPromise();
         expect(newListDevices.some(d => d.id == 'CAS')).toBeTrue();
         
     });

     it('Deberia poder mostrar los dispositivos no asignados sin cambios',
     async () => {
         //Given
         
         //When
         const listDevices = await deviceService.listUnasignedDevices().toPromise();

         //Then
         expect(listDevices.length).toBeGreaterThan(0);
     });
      
});
