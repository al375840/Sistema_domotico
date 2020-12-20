export class RoomNotExists extends Error {
    constructor(name: string) {
      super(`No existe una habitacion con nombre: ${name}`);
    }
  }