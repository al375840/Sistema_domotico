import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Device } from 'src/app/devices/device';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room:Room;
  intervalScroll;
  dialogRef: MatDialogRef<EditRoomComponent, any>;
  newRoomName: string
  constructor(private rs: RoomService, public dialog: MatDialog) { }
  
  ngOnInit(): void {


  }

  openDialog(): void {
    if (this.dialogRef == undefined) {
      this.dialogRef = this.dialog.open(EditRoomComponent, {
        width: '250px',
        data: this.newRoomName,
        autoFocus: true,
        disableClose: false,
        hasBackdrop: true
      });


      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.newRoomName = result;
        this.dialogRef = undefined;
        this.rs.updateRoom(this.room.name,this.newRoomName);
      });
    }
  }

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.container.data[event.currentIndex])
    }
  }

  delete() {
    this.rs.deleteRoom(this.room.name)
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
