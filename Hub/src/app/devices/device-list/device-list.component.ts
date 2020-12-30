import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import { DeviceType } from '../enums/typeEnum';


export interface DeviceTypeParams {
  type: string;
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = []
  devicesLocal: Device[] = []
  dialogRef: any;

  constructor(private ds: DeviceService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.ds.getDevices().subscribe((data) => {
      this.devices = data
  });
  }

  openDialog(): void {
   
    this.dialogRef = this.dialog.open(AddDeviceComponent, {
      width: '200px',
      data: {type:""} as DeviceTypeParams,
      autoFocus: true,
      disableClose: false,
      hasBackdrop: true
    });


    this.dialogRef.afterClosed().subscribe((result: DeviceTypeParams) => {
      console.log('The dialog was closed');
      if(result){
        if (result.type == "movimiento")
          this.ds.addDevice(DeviceType.MOVIMIENTO)
        if (result.type == "alarma")
          this.ds.addDevice(DeviceType.ALARMA)
        if (result.type == "apertura")
          this.ds.addDevice(DeviceType.APERTURA)
      }
    });
  }

}
