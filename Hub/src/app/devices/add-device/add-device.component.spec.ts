import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddDeviceComponent } from './add-device.component';

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MAT_DIALOG_DATA, useValue:{}},
        {provide: MatDialogRef, useValue:{}}
      ],
      declarations: [ AddDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
