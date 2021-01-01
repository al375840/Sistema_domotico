import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { STORAGE } from 'src/app/localstorage/i-local-storage';
import { LocalStorageService } from 'src/app/localstorage/localstorage.service';
import { SERVER_SERVICE } from 'src/app/server/i-server';
import { ServerService } from 'src/app/server/server.service';

import { DeviceInfoComponent } from './device-info.component';

describe('DeviceInfoComponent', () => {
  let component: DeviceInfoComponent;
  let fixture: ComponentFixture<DeviceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue:{}},
        {provide:SERVER_SERVICE, useClass:ServerService},
        {provide:STORAGE, useClass:LocalStorageService}
      ],
      declarations: [ DeviceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
