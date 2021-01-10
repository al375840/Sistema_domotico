import { Entity, Column, ManyToOne, PrimaryColumn, Generated } from 'typeorm';
import { Room } from './room';
import { DeviceType } from '../enums/typeEnum';


@Entity()
export class Device {

    @PrimaryColumn() //@PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "enum",
        enum: DeviceType
    })
    type: DeviceType;

    @Column()
    state: string;

    @Column()
    turned: boolean;

    @ManyToOne(() => Room, room => room.devices, { nullable: true ,onUpdate:'CASCADE',onDelete:'SET NULL'})
    room?: Room;
}