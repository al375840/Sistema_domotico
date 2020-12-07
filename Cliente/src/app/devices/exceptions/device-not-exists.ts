import {Device} from '../device';

export class DeviceNotExists extends Error {
  constructor(device: string) {
    super(`No existe un dispositivo con id: ${device}`);
  }
}