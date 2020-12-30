"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const socket_io_1 = require("socket.io");
const controller_1 = require("./controllers/controller");
const PORT = process.env.PORT || 3000;
var controller;
typeorm_1.createConnection()
    .then((c) => {
    console.log("############################### Conexión con postgres establecida ##############################");
    controller = new controller_1.Controller(c);
    main();
})
    .catch((error) => console.log(error));
//createConnection().then(()=>emitChanges()).catch((error) => console.log(error));
function main() {
    const app = express_1.default().listen(PORT, () => {
        console.log(`Escuchando en ${PORT}`);
    });
    let io = new socket_io_1.Server(app, {
        cors: {
            origin: true,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        var timeout;
        //Emitimos los dispositivos sin habitación y las habitaciones
        const emitChanges = async () => {
            await emitDeviceChanges();
            await emitRoomChanges();
        };
        //Emitimos los dispositivos sin habitación
        const emitDeviceChanges = async () => {
            let devices = await controller.getUnasignedDevices();
            io.emit("unasigndevices", devices);
        };
        //Emitimos las habitaciones
        const emitRoomChanges = async () => {
            let rooms = await controller.getRooms();
            io.emit("rooms", rooms);
        };
        //Emitimos el estado de un dispositivo
        const emitDeviceState = (device) => {
            controller.getDeviceState(device).then((d) => {
                socket.emit("checkState", d);
            });
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
        socket.on("getUnasignedDevices", async () => {
            let devices = await controller.getUnasignedDevices();
            socket.emit("unasigndevices", devices);
        });
        /*HUB*/
        //añadimos los dispositivos cuando del hub recibimos esos disp por
        //un mensaje con la cabecers addDevices
        socket.on("updateState", async (devices) => {
            timeout.refresh();
            if (devices != null && devices.length > 0) {
                await controller.updateState(devices);
            }
        });
        /*Cliente*/
        socket.on("addRoom", async (room) => {
            let done = false;
            if (room != null && room.trim().length > 0) {
                try {
                    await controller.addRoom(room);
                    await emitRoomChanges();
                    done = true;
                }
                catch (e) {
                    console.error(e);
                }
            }
            socket.emit("addRoomRes", done);
        });
        socket.on("deleteRoom", async (room) => {
            let done = false;
            if (room != null) {
                let dl = await controller.deleteRoom(room).catch(() => {
                    done = false;
                });
                if (dl != null &&
                    dl.affected != null &&
                    dl.affected != undefined &&
                    dl.affected > 0) {
                    await emitChanges();
                    done = true;
                }
            }
            socket.emit("deleteRoomRes", done);
        });
        socket.on("updateRoom", async (room, newroom) => {
            let done = false;
            if (newroom != null &&
                newroom.trim() != "") {
                let a = await controller.updateRoom(room, newroom);
                if (a.affected != undefined && a.affected > 0) {
                    await emitRoomChanges();
                    done = true;
                }
            }
            socket.emit("updateRoomRes", done);
        });
        socket.on("getRoom", (room) => {
            controller
                .getRoom(room)
                .then((r) => socket.emit("getRoomRes", r))
                .catch(() => socket.emit("getRoomRes", undefined));
        });
        socket.on("getRooms", () => {
            emitRoomChanges();
        });
        socket.on("asignDevice", async (room, device) => {
            let done = false;
            if (room != null && device != null) {
                let ur = await controller.asignDeviceToRoom(room, device).catch(() => { });
                if (ur != undefined && ur.affected != undefined && ur.affected > 0) {
                    await emitChanges();
                    done = true;
                }
            }
            socket.emit("asignDeviceRes", done);
        });
        socket.on("unasignDevice", async (device) => {
            let done = false;
            if (device != null) {
                let ur = await controller
                    .unasignDevice(device).catch(() => { });
                if (ur != undefined && ur.affected != undefined && ur.affected > 0) {
                    await emitChanges();
                    done = true;
                }
            }
            socket.emit("unasignDeviceRes", done);
        });
        socket.on("checkState", (device) => {
            emitDeviceState(device);
        });
    });
}
