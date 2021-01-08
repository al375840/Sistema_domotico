export class UpdateFailed extends Error {
    constructor(room: string, newroom: string) {
      super(`Fallo al actualizar la habitación revisa los nombres introducidos. Actual:${room}. Nuevo:${newroom}`);
    }
  }