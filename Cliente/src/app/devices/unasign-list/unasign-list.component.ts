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

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    
  }

@ViewChild('containerunasigned') containerunasigned: ElementRef;

  scrollLeft() {
    this.containerunasigned.nativeElement.scrollLeft -= 75;
  }

  scrollRight() {
    this.containerunasigned.nativeElement.scrollLeft += 75;
  }
}
