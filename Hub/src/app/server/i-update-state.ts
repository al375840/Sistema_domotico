import { Device } from "../devices/device";

export interface updateState{
    toAdd: Device[],
    toUpdate: Device[],
    toDelete: Device[]
}