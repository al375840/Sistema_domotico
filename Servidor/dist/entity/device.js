"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const room_1 = require("./room");
const typeEnum_1 = require("../enums/typeEnum");
let Device = class Device {
};
__decorate([
    typeorm_1.PrimaryColumn() //@PrimaryGeneratedColumn()
    ,
    __metadata("design:type", String)
], Device.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: typeEnum_1.DeviceType
    }),
    __metadata("design:type", String)
], Device.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Device.prototype, "state", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Device.prototype, "turned", void 0);
__decorate([
    typeorm_1.ManyToOne(() => room_1.Room, room => room.devices, { nullable: true, onUpdate: 'CASCADE', onDelete: 'SET NULL' }),
    __metadata("design:type", room_1.Room)
], Device.prototype, "room", void 0);
Device = __decorate([
    typeorm_1.Entity()
], Device);
exports.Device = Device;
