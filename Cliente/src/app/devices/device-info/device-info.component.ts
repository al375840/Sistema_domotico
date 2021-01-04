import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddRoomComponent } from 'src/app/rooms/add-room/add-room.component';
import { Device } from '../device';
import { DeviceType } from '../../enums/typeEnum';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  get name() {
    switch(this.data.type) {
      case DeviceType.APERTURA: {
        return "Movement Sensor: " + this.data.id
      }
      case DeviceType.ALARMA: {
        return "Alarm: " + this.data.id
      }
      case DeviceType.APERTURA: {
        return "Opening Sensor: " + this.data.id
      }
    }
  }

  get state() {
    switch(this.data.state) {
      case "NO_MOTION": {
          return "No motion detected"
      }
      case "MOTION_DETECTED": {
        return "Motion detected!!"
      }
      case "CLOSE": {
        return "No opening detected"
      }
      case "OPEN": {
        return "Opening detected!!"
      }
      case "OFF": {
        return "The alarm is off"
      }
      case "ON": {
        return "The alarm is on!!"
      }
    }
  }

  get turned() {
    if(this.data.turned)
      return "Connected"
    else
      return "Not connected"
  }

}
