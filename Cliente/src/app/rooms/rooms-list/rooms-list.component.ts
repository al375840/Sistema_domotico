import { Component, OnInit, Inject } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private rs: RoomService, public dialog: MatDialog) { }
  rooms: Room[] = []
  newRoom: string;
  ngOnInit(): void {
    this.rs.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddRoom, {
      width: '250px',
      data: this.newRoom,
      autoFocus: true,
      disableClose:false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newRoom = result;
      console.log(this.newRoom)
    });
  }

}

@Component({
  selector: 'dialog-add-room',
  templateUrl: 'dialog-add-room.html',
})
export class DialogAddRoom {

  constructor(
    public dialogRef: MatDialogRef<DialogAddRoom>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
