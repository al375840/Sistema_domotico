import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddRoomParams } from '../rooms-list/rooms-list.component';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {

  validName= false;
  usedName= false;

  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddRoomParams) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate(){
    if(this.data.name.trim() != ""){
      this.validName = true
    }else{
      this.validName = false
    }
    if(this.data.usedNames.find(n=>n==this.data.name))
      this.usedName = true
      else
      this.usedName = false
   
  }

}
