"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const controller_1 = require("./controllers/controller");
typeorm_1.createConnection().then((c) => main(c)).catch((error) => console.log(error));
async function main(c) {
    let controller = new controller_1.Controller(c);
    let estado = [
        { id: 'PPP', state: 'OFF', turned: true, type: "alarma" },
        { id: 'ÑÑÑ', state: 'CLOSE', turned: true, type: "apertura" },
        { id: 'EEE', state: 'MOTION_DETECTED', turned: true, type: "movimiento" },
    ];
    await controller.updateState(estado).catch(() => console.log("ERROR 1"));
    await controller.addRoom("hola").catch(() => console.log("ERROR 2"));
    await controller.asignDeviceToRoom({ name: "hola" }, 'PPP').catch(() => console.log("ERROR 3"));
    await controller.asignDeviceToRoom({ name: "hola" }, 'ÑÑÑ').catch(() => console.log("ERROR 4"));
    await controller.asignDeviceToRoom({ name: "hola" }, 'EEE').catch(() => console.log("ERROR 4"));
    console.log("ACTIVAR");
    let alarmas = await controller.alarmsToTriggerOn();
    alarmas.forEach(a => console.log(a.id));
    console.log("DESACTIVAR");
    let alarmasOFF = await controller.alarmsToTriggerOff();
    alarmasOFF.forEach(a => console.log(a.id));
    console.log(await controller.getRooms());
}
