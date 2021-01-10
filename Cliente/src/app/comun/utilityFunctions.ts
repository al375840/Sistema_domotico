import { Device } from "../devices/device";
import { DeviceType } from "../enums/typeEnum";

export function orderDevices(a:Device,b:Device){
    let valores = new Map<String,[number,number]>([[DeviceType.ALARMA,[0,3]],[DeviceType.APERTURA,[1,4]],[DeviceType.MOVIMIENTO,[2,5]]])
    return valores.get(a.type)[(a.turned?0:1)]-valores.get(b.type)[b.turned?0:1] ;
  }