import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-connection-lost-modal',
  templateUrl: './connection-lost-modal.component.html',
  styleUrls: ['./connection-lost-modal.component.css']
})
export class ConnectionLostModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConnectionLostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
