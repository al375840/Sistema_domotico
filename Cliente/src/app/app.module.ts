import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UnasignListComponent } from './devices/unasign-list/unasign-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragScrollModule } from "cdk-drag-scroll";


@NgModule({
  declarations: [
    AppComponent,
    UnasignListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    DragScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
