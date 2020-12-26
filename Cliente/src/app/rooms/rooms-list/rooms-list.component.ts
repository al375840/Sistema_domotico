import {Component, OnInit, Inject} from '@angular/core';
import {Room} from '../room';
import {RoomService} from '../room.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddRoomComponent} from '../add-room/add-room.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private rs: RoomService, public dialog: MatDialog) {
  }

  rooms: Room[] = [];
  roomNames: string[]=[];
  newRoom: string;
  dialogRef: MatDialogRef<AddRoomComponent, any>;

  ngOnInit(): void {
    this.rs.getRooms().subscribe((data) => {

      this.rooms = data.sort((a,b)=>a.name>=b.name?1:-1);
      this.roomNames = data.map((r)=>r.name);
    });
  }

  openDialog(): void {
   
      this.dialogRef = this.dialog.open(AddRoomComponent, {
        width: '250px',
        data: this.newRoom,
        autoFocus: true,
        disableClose: false,
        hasBackdrop: true
      });


      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.newRoom = result;
        
        console.log(this.newRoom);
        this.rs.addRoom(this.newRoom)
      });
    }
  

}

