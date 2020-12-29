import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SERVER_SERVICE } from './server/i-server';
import { ServerService } from './server/server.service';
import { LocalStorageService } from './localstorage/localstorage.service';
import { STORAGE } from './localstorage/i-local-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide:SERVER_SERVICE, useClass:ServerService},
    {provide:STORAGE, useClass:LocalStorageService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
