import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SERVER_SERVICE } from './server/i-server';
import { ServerService } from './server/server.service';
import { LocalStorageService } from './localstorage/localstorage.service';
import { STORAGE } from './localstorage/i-local-storage';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { DeviceInfoComponent } from './devices/device-info/device-info.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS, MAT_RADIO_GROUP } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    DeviceInfoComponent,
    AddDeviceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [
    AddDeviceComponent
  ],
  providers: [
    {provide:SERVER_SERVICE, useClass:ServerService},
    {provide:STORAGE, useClass:LocalStorageService},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' }},
    {provide: MAT_RADIO_GROUP, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
