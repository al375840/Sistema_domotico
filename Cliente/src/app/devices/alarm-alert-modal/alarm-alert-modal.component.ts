import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlarmAlertData } from '../alarm-alert/alarm-alert.component';

@Component({
  selector: 'app-alarm-alert-modal',
  templateUrl: './alarm-alert-modal.component.html',
  styleUrls: ['./alarm-alert-modal.component.css']
})
export class AlarmAlertModalComponent implements OnInit {
  rooms: string[] = []
  constructor(public dialogRef: MatDialogRef<AlarmAlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlarmAlertData) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
