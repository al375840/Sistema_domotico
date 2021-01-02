import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SERVER_SERVICE, IServer } from '../../i-server';
import { ConnectionLostModalComponent } from '../connection-lost-modal/connection-lost-modal.component';

@Component({
  selector: 'app-connection-lost',
  templateUrl: './connection-lost.component.html',
  styleUrls: ['./connection-lost.component.css']
})
export class ConnectionLostComponent implements OnInit {
  dialogRef: any;
  connected: boolean = true;
  alreadyShown: boolean = false;
  constructor(@Inject(SERVER_SERVICE)private server: IServer, public dialog: MatDialog) { }
  
  ngOnInit(): void {

    this.server.disconection().subscribe( (res) => {
      this.connected = res;

      if (!this.connected && !this.dialogRef && !this.alreadyShown) {
        this.openDialog();
        this.alreadyShown = true;
      }

      if (this.connected && this.alreadyShown)
        this.alreadyShown = false;
    })
  }

  openDialog(): void {
   
    this.dialogRef = this.dialog.open(ConnectionLostModalComponent, {
      width: '250px',
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
