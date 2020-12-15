import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnasignListComponent } from './devices/unasign-list/unasign-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UnasignListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
