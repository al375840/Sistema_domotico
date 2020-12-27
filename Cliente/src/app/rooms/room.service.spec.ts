import { TestBed } from '@angular/core/testing';
import { SERVER_SERVICE } from '../comun/i-server';
import { ServerService } from '../comun/server.service';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}],
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
