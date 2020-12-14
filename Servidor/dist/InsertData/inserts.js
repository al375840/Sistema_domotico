"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var controller_1 = require("../controllers/controller");
var typeEnum_1 = require("../enums/typeEnum");
typeorm_1.createConnection().catch(function (error) { return console.log(error); });
controller_1.addDevice({
    type: typeEnum_1.DeviceType.APERTURA,
    state: "close",
    turned: true,
    room: null
});
controller_1.addDevice({
    type: typeEnum_1.DeviceType.APERTURA,
    state: "close",
    turned: true,
    room: null
});
controller_1.addDevice({
    type: typeEnum_1.DeviceType.MOVIMIENTO,
    state: "no_motion",
    turned: true,
    room: null
});
controller_1.getUnasignedDevices().then(function (devices) { return devices.forEach(function (d) { return console.log(d.id); }); });
