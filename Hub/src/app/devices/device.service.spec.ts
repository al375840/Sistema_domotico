import { TestBed } from '@angular/core/testing';
import { STORAGE } from '../localstorage/i-local-storage';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { SERVER_SERVICE } from '../server/i-server';
import { ServerService } from '../server/server.service';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide:SERVER_SERVICE, useClass:ServerService}, {provide:STORAGE, useClass:LocalStorageService}],
    });
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
