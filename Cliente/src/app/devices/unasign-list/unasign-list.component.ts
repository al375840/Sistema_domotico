import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-unasign-list',
  templateUrl: './unasign-list.component.html',
  styleUrls: ['./unasign-list.component.css']
})
export class UnasignListComponent implements OnInit {

  intervalScroll;
  constructor(private ds: DeviceService) { }
  devices: Device[] = [];
  ngOnInit(): void {

    this.ds.listUnasignedDevices().subscribe((data) => {
      
        this.devices = data.sort((a,b)=>a.id>b.id?1:-1);
    });

  }

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer == event.container) {
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.ds.unasignDevice(event.container.data[event.currentIndex].id)
    }
    
  }

@ViewChild('containerunasigned') containerunasigned: ElementRef;

  scrollLeft() {
    this.intervalScroll = setInterval(() => {
      this.containerunasigned.nativeElement.scrollLeft -= 50;
    }, 100);
  }

  stopScroll() {
    clearTimeout(this.intervalScroll)
  }

  scrollRight() {
    this.intervalScroll = setInterval(() => {
      this.containerunasigned.nativeElement.scrollLeft += 50;
    }, 100);
  }

}
