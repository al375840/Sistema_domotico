import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SERVER_SERVICE } from './server/i-server';
import { ServerService } from './server/server.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide:SERVER_SERVICE, useClass:ServerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
