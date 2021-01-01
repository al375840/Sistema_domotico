import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import { DeviceType } from '../enums/typeEnum';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {
  @Input() device?: Device;
  stateDetection = false;
  constructor(private ds: DeviceService) { }

  ngOnInit(): void {
    if (this.device && (this.device.state == "OFF" || this.device.state == "NO_MOTION" || this.device.state == "CLOSE"))
      this.stateDetection = false;
    else
    this.stateDetection = true;
  }

  delete() {
    if(this.device)
      this.ds.deleteDevice(this.device.id? this.device.id: "")
  }

  switchState() {
    let newState: "ON" | "OFF" | "MOTION_DETECTED" | "NO_MOTION" | "CLOSE" | "OPEN" = "ON";
    if (this.device)
    switch (this.device.state) {
      case "ON":
        newState = "OFF"
        break;
      case "OFF":
        newState = "ON"
        break;
      case "CLOSE":
        newState = "OPEN"
        break;
      case "OPEN":
        newState = "CLOSE"
        break;
      case "NO_MOTION":
        newState = "MOTION_DETECTED"
        break;
      case "MOTION_DETECTED":
        newState = "NO_MOTION"
        break;
    }
    if (this.device && this.device.id)
      this.ds.switchDeviceState(this.device.id, newState)
  }

  switchTurned() {
    if(this.device && this.device.id) {
      if(this.device.turned)
        this.ds.switchDeviceTurned(this.device.id, false)
      else
        this.ds.switchDeviceTurned(this.device.id, true)
    }
  }

  get color() {
        
    if(this.device && this.device.turned)
        if(this.device.state == "OFF" || this.device.state == "NO_MOTION" || this.device.state == "CLOSE")
            return "#8BC34A"
        else
            return "#C62828"
    else
        return "#616161"
}

get icon() {
  if (this.device)
    switch(this.device.type) {
        case DeviceType.MOVIMIENTO: {
            return "directions_run"
        }
        case DeviceType.APERTURA: {
            return "sensor_door"
        }
        case DeviceType.ALARMA: {
            return "notification_important"
        }
    }
  else
    return ""
}

get state() {
  if(this.device && (this.device.state == "OFF" || this.device.state == "NO_MOTION" || this.device.state == "CLOSE"))
            return "false"
        else
            return "true"
}

get colorTurned() {
  if(this.device && this.device.turned)
      return "#3F51B5"
  else
    return "#616161"
}

}
