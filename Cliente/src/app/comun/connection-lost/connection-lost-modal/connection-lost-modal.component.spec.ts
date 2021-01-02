import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConnectionLostModalComponent } from './connection-lost-modal.component';

describe('ConnectionLostModalComponent', () => {
  let component: ConnectionLostModalComponent;
  let fixture: ComponentFixture<ConnectionLostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ],
      declarations: [ ConnectionLostModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionLostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
