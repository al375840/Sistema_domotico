import { Injectable } from '@angular/core';
import { Device } from '../devices/device';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor() { }

  
  disconectHub() {
    throw new Error('Unmimplemented')
  }
}
