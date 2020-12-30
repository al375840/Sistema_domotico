import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SERVER_SERVICE } from './server/i-server';
import { ServerService } from './server/server.service';
import { LocalStorageService } from './localstorage/localstorage.service';
import { STORAGE } from './localstorage/i-local-storage';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { DeviceInfoComponent } from './devices/device-info/device-info.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    DeviceInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {provide:SERVER_SERVICE, useClass:ServerService},
    {provide:STORAGE, useClass:LocalStorageService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
