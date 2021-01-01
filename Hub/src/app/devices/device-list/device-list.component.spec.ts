import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { STORAGE } from 'src/app/localstorage/i-local-storage';
import { LocalStorageService } from 'src/app/localstorage/localstorage.service';
import { SERVER_SERVICE } from 'src/app/server/i-server';
import { ServerService } from 'src/app/server/server.service';

import { DeviceListComponent } from './device-list.component';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue:{}},
        {provide:SERVER_SERVICE, useClass:ServerService},
        {provide:STORAGE, useClass:LocalStorageService}
      ],
      declarations: [ DeviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
