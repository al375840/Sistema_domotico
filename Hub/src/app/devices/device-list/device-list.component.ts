import { Component, OnInit } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import { DeviceType } from '../enums/typeEnum';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = []
  devicesLocal: Device[] = []

  constructor(private ds: DeviceService) { 
  }

  ngOnInit(): void {
    this.ds.getDevices().subscribe((data) => {
      this.devices = data
  });
  }

}
