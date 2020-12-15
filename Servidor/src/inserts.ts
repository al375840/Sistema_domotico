import "reflect-metadata";
import { createConnection } from "typeorm";
import { addDevice, getDeviceState, getUnasignedDevices } from "./controllers/controller";
import { Device } from "./entity/device";
import { DeviceType } from "./enums/typeEnum";


createConnection().then(()=>main()).catch((error) => console.log(error));

async function main(){
 /* 	await addDevice({
		type: DeviceType.APERTURA,
		state: "close",
		turned: true
	});
	
	await addDevice({
		type: DeviceType.APERTURA,
		state: "close",
		turned: true
	});
	
	await addDevice({
		type: DeviceType.MOVIMIENTO,
		state: "no_motion",
		turned: true
	});  */
	
	getUnasignedDevices().then((devices) =>
		devices.forEach((d) => console.log(d))
	);
	
	getDeviceState("HCB").then(d=>console.log(d));
}

