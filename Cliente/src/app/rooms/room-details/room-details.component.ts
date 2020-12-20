import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Room } from '../room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room:Room;
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.room.devices, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex)
  }

  @ViewChild('containerdevices') containerdevices: ElementRef;

  scrollLeft() {
    this.containerdevices.nativeElement.scrollLeft -= 75;
  }

  scrollRight() {
    this.containerdevices.nativeElement.scrollLeft += 75;
  }

}
