import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

import { Room } from "./entity/room";
import { Device } from "./entity/device";
import { Server } from "socket.io";
import { addDevice, getUnasignedDevices, getRooms, addRoom, deleteRoom, updateRoom, asignDeviceToRoom, unasignDevice, getDeviceState } from "./controllers/controller";

const PORT = process.env.PORT || 3000;

createConnection().then(() => main()).catch((error) => console.log(error));
//createConnection().then(()=>emitChanges()).catch((error) => console.log(error));

function main(){
	const app = express().listen(PORT, () => {
		console.log(`Escuchando en ${PORT}`);
	});
	
	let io = new Server(app, {
		cors: {
			origin: true,
			methods: ["GET", "POST"],
			credentials: true,
		},
	});
	
	
	
	io.on("connection", (socket) => {
		var timeout: NodeJS.Timeout;
	
		//Emitimos los dispositivos sin habitación y las habitaciones
		const emitChanges = ()=> {
			getUnasignedDevices().then((data: Device[]) => {
				let devices:Device[] = []
				data.forEach((dev) => devices.push(dev));
				//console.log(devices);
				io.emit("unasigndevices", devices);
			});	
	
			getRooms().then((data: Room[]) => {
				let rooms:Room[] = []
				data.forEach((room) => rooms.push(room));
				//console.log(rooms);
				io.emit("rooms", rooms);
			});
		}
	
		//Emitimos los dispositivos sin habitación
		const emitDeviceChanges = ()=> {
			getUnasignedDevices().then((data: Device[]) => {
				let devices:Device[] = []
				data.forEach((dev) => devices.push(dev));
				//console.log(devices);
				io.emit("unasigndevices", devices);
			});	
		}
		//Emitimos las habitaciones
		const emitRoomChanges = ()=> {
			getRooms().then((data: Room[]) => {
				let rooms:Room[] = []
				data.forEach((room) => rooms.push(room));
				//console.log(rooms);
				io.emit("rooms", rooms);
			});
		}
		//Emitimos el estado de un dispositivo
		const emitDeviceState = async(device: string)=> {
			let d = await getDeviceState(device);
			socket.emit("checkState", d);
		}
		
		//Para que cuando se conecte salga un mensaje por pantalla y emita los cambios
		emitChanges()
		console.log("Nueva conexión");
	
		// Miramos si el hub cada 20 segundos ha enviado un mensaje hello (WhatchDog)
		socket.on("emmitter", () => {
			console.log("Añadido emmiter");
			timeout = setTimeout(() => {
				console.log("conexion lost");
				io.emit("conexionlost");
			}, 20000);
		});
	
		/*HUB*/
		//añadimos los dispositivos cuando del hub recibimos esos disp por
		//un mensaje con la cabecers addDevices
		socket.on("addDevice", (devices: Device[]) => {
			timeout.refresh();
			if (devices != null && devices.length > 0) {
				devices.forEach(element => {
					addDevice(element).then(()=>{emitDeviceChanges()})
				});
			}
		});
	
		/*Cliente*/
		socket.on("addRoom", (room: string) => {
			if (room != null) {
				addRoom(room).then(()=>{emitRoomChanges()})
			}
		});
	
		socket.on("deleteRoom", (room: string) => {
			if (room != null) {
				deleteRoom(room).then(()=>{emitChanges()})
			}
		});
	
		socket.on("updateRoom", (room: string, newroom: string) => {
			if (room != null && newroom != null) {
				updateRoom(room, newroom).then(()=>{emitRoomChanges()})
			}
		});
	
		socket.on("asignDevice", (room: Room, device: string) => {
			if (room != null && device != null) {
				asignDeviceToRoom(room, device).then(()=>{emitChanges()})
			}
		});
	
		socket.on("unasignDevice", (device: string) => {
			if (device != null) {
				unasignDevice(device).then(()=>{emitChanges()})
			}
		});
	
		socket.on("checkState", (device: string) => {
			if (device != null) {
				emitDeviceState(device);
			}
		});
	
	});
	
}