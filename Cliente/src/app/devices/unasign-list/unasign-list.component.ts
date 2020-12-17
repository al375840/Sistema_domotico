import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-unasign-list',
  templateUrl: './unasign-list.component.html',
  styleUrls: ['./unasign-list.component.css']
})
export class UnasignListComponent implements OnInit {


  constructor(private ds: DeviceService) { }
  devices: Device[] = [];
  ngOnInit(): void {

    this.ds.listUnasignedDevices().subscribe((data) => {
      this.devices = data;
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.devices, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex)
  }

@ViewChild('containerunasigned') containerunasigned: ElementRef;

  scrollLeft() {
    this.containerunasigned.nativeElement.scrollLeft -= 75;
  }

  scrollRight() {
    this.containerunasigned.nativeElement.scrollLeft += 75;
  }
}
