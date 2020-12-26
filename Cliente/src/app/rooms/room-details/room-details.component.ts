import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Device } from 'src/app/devices/device';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { take } from 'rxjs/operators';

export interface EditRoomName{
  newName:string;
  usedNames:string[];
}
@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room:Room;
  @Input() roomNames:string[];
  intervalScroll;
  dialogRef: MatDialogRef<EditRoomComponent, any>;
  newRoomName: string
  constructor(private rs: RoomService, public dialog: MatDialog) { }
  
  ngOnInit(): void {


  }

  openDialog(): void {
    
      this.dialogRef = this.dialog.open(EditRoomComponent, {
        width: '250px',
        data: {newName:this.room.name,usedNames:this.roomNames}as EditRoomName,
        autoFocus: true,
        disableClose: false,
        hasBackdrop: true
      });


      this.dialogRef.afterClosed().subscribe((result:EditRoomName) => {
        console.log('The dialog was closed');
        if(result){
          this.newRoomName = result.newName;
          console.log(this.room.name,this.newRoomName);
          this.rs.updateRoom(this.room.name,this.newRoomName);
        }
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
                        
      this.rs.asignDevice(event.container.data[event.currentIndex].id, this.room)
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
