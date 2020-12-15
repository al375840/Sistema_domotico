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
typeorm_1.createConnection().catch((error) => console.log(error));
//createConnection().then(()=>emitChanges()).catch((error) => console.log(error));
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
        controller_1.getUnasignedDevices().then((data) => {
            let devices = [];
            data.forEach((dev) => devices.push(dev));
            //console.log(devices);
            io.emit("unasigndevices", devices);
        });
        controller_1.getRooms().then((data) => {
            let rooms = [];
            data.forEach((room) => rooms.push(room));
            //console.log(rooms);
            io.emit("rooms", rooms);
        });
    };
    //Emitimos los dispositivos sin habitación
    const emitDeviceChanges = () => {
        controller_1.getUnasignedDevices().then((data) => {
            let devices = [];
            data.forEach((dev) => devices.push(dev));
            //console.log(devices);
            io.emit("unasigndevices", devices);
        });
    };
    //Emitimos las habitaciones
    const emitRoomChanges = () => {
        controller_1.getRooms().then((data) => {
            let rooms = [];
            data.forEach((room) => rooms.push(room));
            //console.log(rooms);
            io.emit("rooms", rooms);
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
    /*HUB*/
    //añadimos los dispositivos cuando del hub recibimos esos disp por
    //un mensaje con la cabecers addDevices
    socket.on("addDevice", (devices) => {
        timeout.refresh();
        if (devices != null && devices.length > 0) {
            devices.forEach(element => {
                controller_1.addDevice(element).then(() => { emitDeviceChanges(); });
            });
        }
    });
    /*Cliente*/
    socket.on("addRoom", (room) => {
        if (room != null) {
            controller_1.addRoom(room).then(() => { emitRoomChanges(); });
        }
    });
    socket.on("deleteRoom", (room) => {
        if (room != null) {
            controller_1.deleteRoom(room).then(() => { emitChanges(); });
        }
    });
    socket.on("updateRoom", (room, newroom) => {
        if (room != null && newroom != null) {
            controller_1.updateRoom(room, newroom).then(() => { emitRoomChanges(); });
        }
    });
    socket.on("asignDevice", (room, device) => {
        if (room != null && device != null) {
            controller_1.asignDeviceToRoom(room, device).then(() => { emitChanges(); });
        }
    });
    socket.on("unasignDevice", (device) => {
        if (device != null) {
            controller_1.unasignDevice(device).then(() => { emitChanges(); });
        }
    });
});
