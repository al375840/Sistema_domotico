import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/devices/device';
import { Room } from '../room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room:Room;
  intervalScroll;
  constructor() { }
  devices: Device[] = [{id:"JME",state:"true",turned:true,type:"alarma"}as Device];
  ngOnInit(): void {


  }

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.previousContainer.data[event.previousIndex])
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
