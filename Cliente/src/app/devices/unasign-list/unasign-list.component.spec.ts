import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SERVER_SERVICE } from 'src/app/comun/i-server';
import { ServerService } from 'src/app/comun/server.service';

import { UnasignListComponent } from './unasign-list.component';

describe('UnasignListComponent', () => {
  let component: UnasignListComponent;
  let fixture: ComponentFixture<UnasignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}],
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
