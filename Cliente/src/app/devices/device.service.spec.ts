import { TestBed } from '@angular/core/testing';
import { SERVER_SERVICE } from '../comun/i-server';
import { ServerService } from '../comun/server.service';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerService,{provide:SERVER_SERVICE, useClass:ServerService}],
    });
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
