import { DeviceType } from "./enums/typeEnum";
import { Toggable } from "./toggable";
import { WithId } from "./withId";
import { WithState } from "./withState";

export type Device = Alarm | Movement | Opening


export interface Alarm extends WithState,Toggable,WithId{
    type: DeviceType.ALARMA;
    state: "ON"|"OFF";
}
export interface Movement extends WithState,Toggable,WithId{
    type: DeviceType.MOVIMIENTO;
    state: "MOTION_DETECTED"|"NO_MOTION";
}
export interface Opening extends WithState,Toggable,WithId{
    type: DeviceType.APERTURA;
    state: "OPEN"|"CLOSE";
}

