import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UnasignListComponent } from './devices/unasign-list/unasign-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragScrollModule } from "cdk-drag-scroll";
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { DeviceDetailsComponent } from './devices/device-details/deviceDetails.component';
import { SERVER_SERVICE } from './comun/i-server';
import { ServerService } from './comun/server.service';
import { DeviceInfoComponent } from './devices/device-info/device-info.component';
import { AlarmAlertComponent } from './devices/alarm-alert/alarm-alert.component';
import { AlarmAlertModalComponent } from './devices/alarm-alert-modal/alarm-alert-modal.component';
import { ConnectionLostComponent } from './comun/connection-lost/connection-lost/connection-lost.component';
import { ConnectionLostModalComponent } from './comun/connection-lost/connection-lost-modal/connection-lost-modal.component';


@NgModule({
  declarations: [
    DeviceDetailsComponent,
    AppComponent,
    UnasignListComponent,
    RoomsListComponent,
    RoomDetailsComponent,
    EditRoomComponent,
    AddRoomComponent,
    DeviceInfoComponent,
    AlarmAlertComponent,
    AlarmAlertModalComponent,
    ConnectionLostComponent,
    ConnectionLostModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    DragScrollModule,
    MatDialogModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  
  entryComponents: [
    AddRoomComponent,
    EditRoomComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide:SERVER_SERVICE, useClass:ServerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
