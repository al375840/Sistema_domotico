import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerService } from 'src/app/comun/server.service';

import { UnasignListComponent } from './unasign-list.component';

describe('UnasignListComponent', () => {
  let component: UnasignListComponent;
  let fixture: ComponentFixture<UnasignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ServerService,{provide:'IServer', useClass:ServerService}],
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
