import "reflect-metadata";
import { createConnection, Connection } from 'typeorm';
import { Controller } from './controllers/controller';
import { Device } from "./entity/device";
import { Room } from "./entity/room";


createConnection().then((c) => main(c)).catch((error) => console.log(error));

async function main(c:Connection) {
	let controller = new Controller(c);
	let estado = [
		{id:'PPP',state:'OFF',turned:true,type:"alarma"}as Device,
		{id:'ÑÑÑ',state:'CLOSE',turned:true,type:"apertura"}as Device,
		{id:'EEE',state:'MOTION_DETECTED',turned:true,type:"movimiento"}as Device,
	]
	
	await controller.updateState(estado).catch(()=>console.log("ERROR 1"));
	await controller.addRoom("hola").catch(()=>console.log("ERROR 2"));
	await controller.asignDeviceToRoom({name:"hola"},'PPP').catch(()=>console.log("ERROR 3"));
	await controller.asignDeviceToRoom({name:"hola"},'ÑÑÑ').catch(()=>console.log("ERROR 4"));
	await controller.asignDeviceToRoom({name:"hola"},'EEE').catch(()=>console.log("ERROR 4"));
	
	console.log("ACTIVAR")
	let alarmas =await controller.alarmsToTriggerOn()
	alarmas.forEach(a =>console.log(a.id))
	console.log("DESACTIVAR")
	let alarmasOFF =await controller.alarmsToTriggerOff()
	alarmasOFF.forEach(a =>console.log(a.id))
	console.log(await controller.getRooms())
	
	
	
}
