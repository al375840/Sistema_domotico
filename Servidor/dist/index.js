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
        const emitChanges = () => {
            controller.getUnasignedDevices().then((data) => {
                let devices = [];
                data.forEach((dev) => devices.push(dev));
                //console.log(devices);
                io.emit("unasigndevices", devices);
            });
            controller.getRooms().then((data) => {
                let rooms = [];
                data.forEach((room) => rooms.push(room));
                //console.log(rooms);
                io.emit("rooms", rooms);
            });
        };
        //Emitimos los dispositivos sin habitación
        const emitDeviceChanges = () => {
            controller.getUnasignedDevices().then((data) => {
                let devices = [];
                data.forEach((dev) => devices.push(dev));
                //console.log(devices);
                io.emit("unasigndevices", devices);
            });
        };
        //Emitimos las habitaciones
        const emitRoomChanges = () => {
            controller.getRooms().then((data) => {
                let rooms = [];
                data.forEach((room) => rooms.push(room));
                //console.log(rooms);
                io.emit("rooms", rooms);
            });
        };
        //Emitimos el estado de un dispositivo
        const emitDeviceState = (device) => {
            controller.getDeviceState(device).then((d) => {
                socket.emit("checkState", d);
            });
        };
        const emitRoom = async (room) => {
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
        socket.on("getUnasignedDevices", () => {
            controller.getUnasignedDevices().then((data) => {
                let devices = [];
                data.forEach((dev) => devices.push(dev));
                //console.log(devices);
                socket.emit("unasigndevices", devices);
            });
        });
        /*HUB*/
        //añadimos los dispositivos cuando del hub recibimos esos disp por
        //un mensaje con la cabecers addDevices
        socket.on("addDevice", (devices) => {
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
        socket.on("addRoom", async (room) => {
            let res = "OK";
            if (room != null && room.trim().length > 0) {
                await controller.addRoom(room)
                    .then(() => {
                    emitRoomChanges();
                })
                    .catch(() => (res = "Error"));
            }
            else {
                res = "Error";
            }
            socket.emit("addRoomRes", res);
        });
        socket.on("deleteRoom", (room) => {
            let res = "OK";
            if (room != null) {
                controller.deleteRoom(room).then(() => {
                    emitChanges();
                });
            }
            else {
                res = "Error";
            }
            socket.emit("deleteRoomRes", res);
        });
        socket.on("updateRoom", (room, newroom) => {
            if (room != null && newroom != null) {
                controller.updateRoom(room, newroom).then(() => {
                    emitRoomChanges();
                });
            }
        });
        socket.on("getRoom", (room) => {
            if (room != null) {
                emitRoom(room);
            }
        });
        socket.on("asignDevice", (room, device) => {
            if (room != null && device != null) {
                controller.asignDeviceToRoom(room, device).then(() => {
                    emitChanges();
                });
            }
        });
        socket.on("unasignDevice", (device) => {
            if (device != null) {
                controller.unasignDevice(device).then(() => {
                    emitChanges();
                });
            }
        });
        socket.on("checkState", (device) => {
            if (device != null) {
                emitDeviceState(device);
            }
        });
    });
}
