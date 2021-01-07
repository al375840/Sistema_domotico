import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
     this.matIconRegistry.addSvgIcon('notifications_none', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/alarma/notifications_none.svg'));
     this.matIconRegistry.addSvgIcon('notifications_active', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/alarma/notifications_active.svg'));
     this.matIconRegistry.addSvgIcon('notifications_paused', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/alarma/notifications_paused.svg'));

     this.matIconRegistry.addSvgIcon('sensor_door', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/apertura/sensor_door.svg'));
     this.matIconRegistry.addSvgIcon('sensor_open_door', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/apertura/sensor_open_door.svg'));

     this.matIconRegistry.addSvgIcon('directions_run', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/movimiento/directions_run.svg'));
     this.matIconRegistry.addSvgIcon('directions_walk', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/movimiento/directions_walk.svg'));
  }
  
  title = 'Hub';
}

