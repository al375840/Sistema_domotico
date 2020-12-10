import { DeviceService } from '../app/devices/device.service';
import { Device } from '../app/devices/device';
import { DeviceNotExists } from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService, limpiarEstado } from './comun';

describe('HU07: Consultar estado de los dispositivos', () => {
  let deviceService: DeviceService;

  beforeEach(() => {
    deviceService = obtainDeviceService();
  });

  it('Deberia poder consultar el estado de los dispositivos', async () => {
    // Given -- El id de uno de los dispositivos del hub

    const id = 'CAS';

    // When -- Consultamos el estado del dispositivo
    const checkedState = await deviceService.checkState(id);

    // Then -- debería devolver un dispositivo
    expect(checkedState.id).toBe('CAS');
  });

  it('No deberia poder consultar el estado de los dispositivos que no existen', async () => {
    // Given -- un id vacio

    const id = '';

    // When -- consultamos el estado
    const checkedState = await deviceService.checkState(id);

    // Then -- se produce una excepción que indica que no existe el dispositivo
    expect(checkedState).toThrow(new DeviceNotExists(id));
  });
  afterEach(() => {
    limpiarEstado();
  });
});
