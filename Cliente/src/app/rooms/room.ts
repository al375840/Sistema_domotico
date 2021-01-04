import {Device} from '../devices/device';
 
export class Room  {
    name?: string;
    devices: Device[];

    constructor(name:string) {
        this.name=name;
        
    }
  }

