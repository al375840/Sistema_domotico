import {Device} from '../devices/device';
 
export class Room  {
    id?: number;
    name: string;
    devices: Device[];

    constructor(public newName:string) {
        //TODO
        
    }
  }

