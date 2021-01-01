import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Room } from 'src/app/rooms/room';
import { RoomService } from 'src/app/rooms/room.service';
import { AlarmAlertModalComponent } from '../alarm-alert-modal/alarm-alert-modal.component';

export interface AlarmAlertData {
  names: string[]
}

@Component({
  selector: 'app-alarm-alert',
  templateUrl: './alarm-alert.component.html',
  styleUrls: ['./alarm-alert.component.css']
})
export class AlarmAlertComponent implements OnInit {

  dialogRef: MatDialogRef<AlarmAlertModalComponent, any>;
  roomNames: string[] = []
  constructor(public dialog: MatDialog, private rs: RoomService) { }

  ngOnInit(): void {
    this.rs.getRoomsWithAlarms().subscribe((newNames:string[])=>{
      if(newNames.length != this.roomNames.length){
        let iguales = true;
        let i = 0
        while(i<newNames.length && iguales){
          if(this.roomNames[i] != newNames[i])
            iguales = false
          i++;
        }

        if(!iguales) {
          this.roomNames = newNames;
          this.openDialog()
        }
        
      }
      
    })
  }


  openDialog(): void {
   
    this.dialogRef = this.dialog.open(AlarmAlertModalComponent, {
      width: '250px',
      data: {names: this.roomNames} as AlarmAlertData,
      autoFocus: true,
      disableClose: false,
      hasBackdrop: true
    });


    this.dialogRef.afterClosed().subscribe((result: string[]) => {
      console.log('The dialog was closed');
      this.dialogRef = undefined;
    });
  }
}
