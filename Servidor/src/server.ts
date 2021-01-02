import express from "express";
import { Server } from "socket.io";
import { IController } from "./controllers/icontroller";
import { Device } from "./entity/device";
import { Room } from "./entity/room";
import { UpdateAlarm } from "./others/IUpdateAlarm";


export class SocketServer {
	cambiosCliente: boolean = false;
	PORT = process.env.PORT || 3000;
	controller: IController;
	timeout: NodeJS.Timeout;
	constructor(controller: IController) {
		this.controller = controller;
	}

	start() {
		const app = express().listen(this.PORT, () => {
			console.log(`Escuchando en ${this.PORT}`);
		});

		let io = new Server(app, {
			cors: {
				origin: true,
				methods: ["GET", "POST"],
				credentials: true,
			},
		});

		io.on("connection", (socket) => {
			//Emitimos los dispositivos sin habitación y las habitaciones
			const emitChanges = async () => {
				await emitDeviceChanges();
				await emitRoomChanges();
			};

			//Emitimos los dispositivos sin habitación
			const emitDeviceChanges = async () => {
				let devices = await this.controller.getUnasignedDevices();
				io.emit("unasigndevices", devices);
			};
			//Emitimos las habitaciones
			const emitRoomChanges = async () => {
				let rooms = await this.controller.getRooms();
				io.emit("rooms", rooms);
			};
			//Emitimos el estado de un dispositivo
			const emitDeviceState = async (id: string) => {
				let device = await this.controller.getDeviceState(id);
				socket.emit("checkState", device);
			};

			//Para que cuando se conecte salga un mensaje por pantalla y emita los cambios
			emitChanges();
			console.log("Nueva conexión");

			// Miramos si el hub cada 20 segundos ha enviado un mensaje hello (WhatchDog)
			socket.on("emmitter", () => {
				console.log("Añadido emmiter");
				this.timeout = setTimeout(() => {
					console.log("conexion lost");
					io.emit("conexionlost");
				}, 20000);
			});

			socket.on("getUnasignedDevices", async () => {
				let devices = await this.controller.getUnasignedDevices();
				socket.emit("unasigndevices", devices);
			});

			/*HUB*/
			//añadimos los dispositivos cuando del hub recibimos esos disp por
			//un mensaje con la cabecers addDevices
			var cambiosCliente: boolean = false;
			socket.on("updateState", async (devices: Device[]) => {
				this.timeout.refresh();
				if (devices != null) {
					let changes = await this.controller.updateState(devices);
					if (this.cambiosCliente || changes > 0) {
						let resp: UpdateAlarm = {
							turnOn: await this.controller.alarmsToTriggerOn(),
							turnOff: await this.controller.alarmsToTriggerOff(),
						};
						if (resp.turnOff.length > 0 || resp.turnOn.length > 0)
							socket.emit("updateAlarms", resp);

						await emitChanges();
						this.cambiosCliente = false;
					}
				}
			});

			/*Cliente*/
			socket.on("addRoom", async (room: string | null) => {
				let done = false;
				if (room && room.trim().length > 0) {
					done = await this.controller.addRoom(room);
					if (done) await emitRoomChanges();
				}
				socket.emit("addRoomRes", done);
			});

			socket.on("deleteRoom", async (room: string | null) => {
				let done = false;
				if (room) {
					done = await this.controller.deleteRoom(room) > 0;
					if (done) {
						await emitChanges();
						this.cambiosCliente = true;
					}
				}
				socket.emit("deleteRoomRes", done);
			});

			socket.on("updateRoom", async (room: string, newroom: string) => {
				let done = false;
				if (newroom && newroom.trim() != "") {
					done = await this.controller.updateRoom(room, newroom) > 0;
					if (done) await emitRoomChanges();
				}
				socket.emit("updateRoomRes", done);
			});

			socket.on("getRoom", (room: string) => {
				this.controller
					.getRoom(room)
					.then((r) => socket.emit("getRoomRes", r))
					.catch(() => socket.emit("getRoomRes", undefined));
			});

			socket.on("getRooms", () => {
				emitRoomChanges();
			});

			socket.on("asignDevice", async (room: Room, device: string) => {
				let done = false;
				if (room && device) {
					done = await this.controller.asignDeviceToRoom(room, device) > 0;
					if (done) {
						await emitChanges();
						this.cambiosCliente = true;
					}
				}
				socket.emit("asignDeviceRes", done);
			});

			socket.on("unasignDevice", async (device: string) => {
				let done = false;
				if (device != null) {
					done = await this.controller.unasignDevice(device) > 0;
					if (done) {
						await emitChanges();
						this.cambiosCliente = true;
					}
				}
				socket.emit("unasignDeviceRes", done);
			});

			socket.on("checkState", (device: string) => {
				emitDeviceState(device);
			});
		});
	}
}
