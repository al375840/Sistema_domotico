import { DeviceService } from '../app/devices/device.service';
import { Device } from '../app/devices/device';
import { DeviceNotExists } from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService, limpiarEstado } from './comun';
import { take } from 'rxjs/operators';

describe('HU07: Consultar estado de los dispositivos', () => {
  let deviceService: DeviceService;

  beforeEach(() => {
    deviceService = obtainDeviceService();
  });

  it('Deberia poder consultar el estado de los dispositivos', async () => {
    // Given -- El id de uno de los dispositivos del hub

    const id = 'FEN';

    // When -- Consultamos el estado del dispositivo
    var checkedState = await deviceService.checkState(id).pipe(take(1)).toPromise();

    // Then -- debería devolver un dispositivo
    expect(checkedState.id).toBe('FEN');
  },20000);

  it('No deberia poder consultar el estado de los dispositivos que no existen', async () => {
    // Given -- un id vacio

    const id = '';

    // When -- consultamos el estado
    // Then -- se produce una excepción que indica que no existe el dispositivo
    expectAsync(deviceService.checkState(id).pipe(take(1)).toPromise()).toBeRejectedWith(new DeviceNotExists(id));
  },20000);
  afterEach(() => {
    limpiarEstado();
  });
},);
