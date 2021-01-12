import { Device } from "../entity/device";

export interface updateState{
    toAdd: Device[],
    toUpdate: Device[],
    toDelete: Device[]
}