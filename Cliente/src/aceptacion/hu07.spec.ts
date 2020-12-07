
import {DeviceService} from '../app/devices/device.service';
import {Device} from '../app/devices/device';
import {DeviceNotExists} from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService } from './comun';

describe('HU07: Consultar estado de los dispositivos', () => {
    let deviceService: DeviceService;

    beforeEach(() => {
        deviceService = obtainDeviceService();
    });

    it('Deberia poder consultar el estado de los dispositivos',
     async () => {
         //Given -- En given obtendremos la id de uno de los dispositivos que tiene el hub por default
         
        const id = "CAS"
         
         //When
        const checkedState = await deviceService.checkState(id);

         //Then
         expect(checkedState).toBeInstanceOf(Device)
     });

     it('No deberia poder consultar el estado de los dispositivos que no existen',
     async () => {
         //Given
         
        const id = ""
         
         //When
        const checkedState = await deviceService.checkState(id);

         //Then
         expect(checkedState).toThrow(new DeviceNotExists(id));
     });
      
});

