"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const controller_1 = require("./controllers/controller");
typeorm_1.createConnection().then(() => main()).catch((error) => console.log(error));
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
    controller_1.getUnasignedDevices().then((devices) => devices.forEach((d) => console.log(d)));
    controller_1.getDeviceState("HCB").then(d => console.log(d));
}
