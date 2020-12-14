import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Device } from './device';


@Entity()
export class Room {

  @PrimaryColumn()
  name: string;
  
  @OneToMany(() => Device, device => device.room,{nullable: true})
  devices?: Device[];
  
}