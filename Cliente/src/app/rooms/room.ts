import {Device} from '../devices/device';
 
export class Room  {
    name?: string;
    devices: Device[];

    constructor(public newName:string) {
        this.name=newName;
        
    }
  }

