import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DeviceDetailsComponent } from './deviceDetails.component';

describe('DeviceDetailsComponent', () => {
    let component: DeviceDetailsComponent;
    let fixture: ComponentFixture<DeviceDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
              ],
            declarations: [ DeviceDetailsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
