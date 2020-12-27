import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Device } from '../device';
import { DeviceInfoComponent } from '../device-info/device-info.component';

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
            if(this.device.state in ["OFF", "NO_MOTION", "CLOSED"])
                return "#C62828"
            else
                return "#8BC34A"
        else
            return "#616161"
    }

    get icon() {
        switch(this.device.type) {
            case "movimiento": {
                return "directions_walks"
            }
            case "apertura": {
                return "sensor_door"
            }
            case "alarma": {
                return "notification_important"
            }
        }
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