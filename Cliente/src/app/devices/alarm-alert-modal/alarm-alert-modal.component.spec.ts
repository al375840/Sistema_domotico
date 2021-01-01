import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlarmAlertModalComponent } from './alarm-alert-modal.component';

describe('AlarmAlertModalComponent', () => {
  let component: AlarmAlertModalComponent;
  let fixture: ComponentFixture<AlarmAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmAlertModalComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
