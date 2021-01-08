export class AsignFailed extends Error {
    constructor(room: string, device: string) {
      super(`Fallo al asignar el dispositivo ${device} a la habitación :${room}.`);
    }
  }