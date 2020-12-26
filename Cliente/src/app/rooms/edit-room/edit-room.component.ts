import { Component, Inject, OnInit, ViewChild, ElementRef, ViewRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditRoomName } from '../room-details/room-details.component';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent{

  validName= false;
  usedName= true;
  changed = false
  constructor(
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditRoomName) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate(){
    this.changed = true
    if(this.data.newName.trim() != ""){
      this.validName = true
    }else{
      this.validName = false
    }
    if(this.data.usedNames.find(n=>n==this.data.newName))
      this.usedName = true
      else
      this.usedName = false
   
  }


}
