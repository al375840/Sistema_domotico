import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SERVER_SERVICE } from '../../i-server';
import { ServerService } from '../../server.service';

import { ConnectionLostComponent } from './connection-lost.component';

describe('ConnectionLostComponent', () => {
  let component: ConnectionLostComponent;
  let fixture: ComponentFixture<ConnectionLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        ServerService,{provide:SERVER_SERVICE, useClass:ServerService}
      ],
      declarations: [ ConnectionLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
