import { Toggable } from "./toggable";
import { WithState } from "./withState";


export class Device implements WithState,Toggable {
    id?: string;
    type: string;
    state: string;
    turned: boolean;
  }