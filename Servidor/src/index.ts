import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

import { Room } from "./entity/room";
import { Device } from "./entity/device";
import { Server } from "socket.io";
import { Controller } from './controllers/controller';


const PORT = process.env.PORT || 3000;
var controller:Controller;
createConnection()
	.then((c) => {
		console.log("############################### Conexión con postgres establecida ##############################")
		controller = new Controller(c)
		main()
	})
	.catch((error) => console.log(error));
//createConnection().then(()=>emitChanges()).catch((error) => console.log(error));

function main() {
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
		const emitChanges = () => {
			controller.getUnasignedDevices().then((data: Device[]) => {
				let devices: Device[] = [];
				data.forEach((dev) => devices.push(dev));
				//console.log(devices);
				io.emit("unasigndevices", devices);
			});

			controller.getRooms().then((data: Room[]) => {
				let rooms: Room[] = [];
				data.forEach((room) => rooms.push(room));
				//console.log(rooms);
				io.emit("rooms", rooms);
			});
		};

		//Emitimos los dispositivos sin habitación
		const emitDeviceChanges = () => {
			controller.getUnasignedDevices().then((data: Device[]) => {
				let devices: Device[] = [];
				data.forEach((dev) => devices.push(dev));
				//console.log(devices);
				io.emit("unasigndevices", devices);
			});
		};
		//Emitimos las habitaciones
		const emitRoomChanges = () => {
			controller.getRooms().then((data: Room[]) => {
				let rooms: Room[] = [];
				data.forEach((room) => rooms.push(room));
				//console.log(rooms);
				io.emit("rooms", rooms);
			});
		};
		//Emitimos el estado de un dispositivo
		const emitDeviceState = (device: string) => {
			controller.getDeviceState(device).then((d) => {
				socket.emit("checkState", d);
			});
		};

		const emitRoom = async (room: string) => {
			await controller.getRoom(room).then((r) => socket.emit("getRoom", r));
		};

		//Para que cuando se conecte salga un mensaje por pantalla y emita los cambios
		emitChanges();
		console.log("Nueva conexión");

		// Miramos si el hub cada 20 segundos ha enviado un mensaje hello (WhatchDog)
		socket.on("emmitter", () => {
			console.log("Añadido emmiter");
			timeout = setTimeout(() => {
				console.log("conexion lost");
				io.emit("conexionlost");
			}, 20000);
		});

		socket.on("getUnasignedDevices",()=>{
			controller.getUnasignedDevices().then((data)=>{
				let devices: Device[] = [];
				data.forEach((dev) => devices.push(dev));
				//console.log(devices);
				socket.emit("unasigndevices", devices);
			})
			
		})

		/*HUB*/
		//añadimos los dispositivos cuando del hub recibimos esos disp por
		//un mensaje con la cabecers addDevices
		socket.on("addDevice", (devices: Device[]) => {
			timeout.refresh();
			if (devices != null && devices.length > 0) {
				devices.forEach((element) => {
					controller.addDevice(element).then(() => {
						emitDeviceChanges();
					});
				});
			}
		});

		/*Cliente*/
		socket.on("addRoom", async(room: string) => {
			let res = "OK";
			if (room != null && room.trim().length > 0) {
				await controller.addRoom(room)
					.then(() => {
						emitRoomChanges();
					})
					.catch(() => (res = "Error"));
			} else {
				res = "Error";
			}
			socket.emit("addRoomRes", res);
		});

		socket.on("deleteRoom", (room: string) => {
			let res = "OK";
			if (room != null) {
				controller.deleteRoom(room).then(() => {
					emitChanges();
				});
			} else {
				res = "Error";
			}
			socket.emit("deleteRoomRes", res);
		});

		socket.on("updateRoom", (room: string, newroom: string) => {
			if (room != null && newroom != null) {
				controller.updateRoom(room, newroom).then(() => {
					emitRoomChanges();
				});
			}
		});

		socket.on("getRoom", (room: string) => {
			if (room != null) {
				emitRoom(room);
			}
		});

		socket.on("asignDevice", (room: Room, device: string) => {
			if (room != null && device != null) {
				controller.asignDeviceToRoom(room, device).then(() => {
					emitChanges();
				});
			}
		});

		socket.on("unasignDevice", (device: string) => {
			if (device != null) {
				controller.unasignDevice(device).then(() => {
					emitChanges();
				});
			}
		});

		socket.on("checkState", (device: string) => {
			if (device != null) {
				emitDeviceState(device);
			}
		});
	});
}
