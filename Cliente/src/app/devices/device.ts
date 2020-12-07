import {WithState} from '../comun/withState'
import {Toggable} from '../comun/toggable'

export class Device implements WithState,Toggable {
    id?: string;
    type: string;
    state: string;
    turned: boolean;
  }