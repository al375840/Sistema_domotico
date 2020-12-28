import { DeviceType } from "./enums/typeEnum";
import { Toggable } from "./toggable";
import { WithState } from "./withState";

export class Device implements WithState,Toggable {
    id?: string;
    type: DeviceType;
    state: string;
    turned: boolean;
  }
