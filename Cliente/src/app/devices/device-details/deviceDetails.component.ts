import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Device } from '../device';
import { DeviceInfoComponent } from '../device-info/device-info.component';
import { DeviceType } from '../../enums/typeEnum';

@Component({
    selector: 'app-device-details',
    templateUrl: './deviceDetails.component.html',
    styleUrls: ['./deviceDetails.component.css']
})
export class DeviceDetailsComponent {
    @Input() device: Device
    dialogRef: MatDialogRef<DeviceInfoComponent, any>;;
    room: any;
    roomNames: any;
    newRoomName: any;
    rs: any;
    snackbar: any;
    constructor (public dialog: MatDialog) {}
    get color() {
        if(this.device.turned)
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
                if(this.device.state=='MOTION_DETECTED' && this.device.turned)
                  return "directions_run"
                else
                  return "directions_walk"
              }
              case DeviceType.APERTURA: {
                if (this.device.state=='OPEN' && this.device.turned)
                  return "sensor_open_door"
                else
                  return "sensor_door"
              }
              case DeviceType.ALARMA: {
              if(this.device.turned){
                  if (this.device.state=='OFF')
                    return "notifications_none"
                  else
                    return "notifications_active"
                }else
              return "notifications_paused"
              }
          }
        else
          return ""
      }

    openDialog(): void {
    
        this.dialogRef = this.dialog.open(DeviceInfoComponent, {
          width: '250px',
          data: this.device,
          autoFocus: true,
          disableClose: false,
          hasBackdrop: true
        });
      
    }
}