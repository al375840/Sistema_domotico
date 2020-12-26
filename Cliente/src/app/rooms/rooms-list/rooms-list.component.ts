import {Component, OnInit, Inject} from '@angular/core';
import {Room} from '../room';
import {RoomService} from '../room.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddRoomComponent} from '../add-room/add-room.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AddRoomParams{
  name:string;
  usedNames:string[];
}

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private rs: RoomService, public dialog: MatDialog, private snackbar: MatSnackBar) {
  }

  rooms: Room[] = [];
  roomNames: string[]=[];
  newRoom: string;
  dialogRef: MatDialogRef<AddRoomComponent, any>;

  ngOnInit(): void {
    this.rs.getRooms().subscribe((data) => {

      this.rooms = data.sort((a,b)=>a.name>=b.name?1:-1);
      this.roomNames = data.map((r)=>r.name);
      this.rooms.forEach(r=>r.devices.sort((a,b) =>a.id>b.id?1:-1))
    });
  }

  openDialog(): void {
   
      this.dialogRef = this.dialog.open(AddRoomComponent, {
        width: '250px',
        data: {name:"",usedNames:this.roomNames}as AddRoomParams,
        autoFocus: true,
        disableClose: false,
        hasBackdrop: true
      });


      this.dialogRef.afterClosed().subscribe((result:AddRoomParams) => {
        console.log('The dialog was closed');
        if(result){
          this.newRoom = result.name;
        
          console.log(this.newRoom);
          this.rs.addRoom(this.newRoom)
          this.snackbar.open("Room added successfully", "Ok", {
            duration: 2000,
          });
        }
      });
    }
  

}

