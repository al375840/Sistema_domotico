import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoomsListComponent } from './rooms-list.component';

describe('RoomsListComponent', () => {
  let component: RoomsListComponent;
  let fixture: ComponentFixture<RoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatSnackBar, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ],
      declarations: [ RoomsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
