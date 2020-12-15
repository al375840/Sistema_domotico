import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnasignListComponent } from './unasign-list.component';

describe('UnasignListComponent', () => {
  let component: UnasignListComponent;
  let fixture: ComponentFixture<UnasignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnasignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnasignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
