import "reflect-metadata";
import { createConnection } from "typeorm";
import { Controller } from './controllers/controller';


//createConnection().then(() => main()).catch((error) => console.log(error));

async function main() {
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

	/* getUnasignedDevices().then((devices) =>
		devices.forEach((d) => console.log(d))
	);
	
	
	getDeviceState("HCB").then(d=>console.log(d)); */
	/* var controller = new Controller();
	controller.updateRoom("Entrada", "B").catch(() => console.log("Nombre no correcto")); */

	//console.log(await getRoom("Salon"))
}
