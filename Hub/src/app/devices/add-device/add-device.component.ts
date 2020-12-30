import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../device';
import { DeviceTypeParams } from '../device-list/device-list.component';
import { DeviceType } from '../enums/typeEnum';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceTypeParams) { }

    close(): void {
      this.dialogRef.close();
    }

}
