import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SERVER_SERVICE } from 'src/app/comun/i-server';
import { ServerService } from 'src/app/comun/server.service';
import { RoomService } from 'src/app/rooms/room.service';

import { AlarmAlertComponent } from './alarm-alert.component';

describe('AlarmAlertComponent', () => {
  let component: AlarmAlertComponent;
  let fixture: ComponentFixture<AlarmAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RoomService,
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        ServerService,{provide:SERVER_SERVICE, useClass:ServerService}
      ],
      declarations: [ AlarmAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
