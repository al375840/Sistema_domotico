import { Device } from "../entity/device";

export interface UpdateAlarm{
    turnOn:Device[];
    turnOff:Device[];
}