import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent{

  constructor(
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
