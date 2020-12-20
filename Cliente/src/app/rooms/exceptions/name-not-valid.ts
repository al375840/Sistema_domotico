export class NameNotValid extends Error {
    constructor(name: string) {
      super(`Este nombre no es válido: ${name}`);
    }
  }