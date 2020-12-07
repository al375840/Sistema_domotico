import {DeviceService} from '../app/devices/device.service';
import {Device} from '../app/devices/device';
import {DeviceNotExists} from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService } from './comun';

describe('HU08: Listar dispositivos no asignados conocidos', () => {
    let deviceService: DeviceService;

    beforeEach(() => {
        deviceService = obtainDeviceService();
    });

    it('Deberia devolver una lista vacía cuando no hay dispositivos no asignados',
     async () => {
         //Given 
         const room = new Room("Test");
         //When
        const listDevices = await deviceService.listDevices();

         //Then
         expect(listDevices.length).toBe(0);

         //After


     });

     it('Deberia devolver una lista no vacia cuando hay algun dispositivo no asignado',
     async () => {
         //Given
         //When
         const listDevices = await deviceService.listDevices();

         //Then
         expect(listDevices.length).toBeGreaterThan(0);
     });
      
});