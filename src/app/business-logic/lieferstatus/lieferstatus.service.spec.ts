import { TestBed } from '@angular/core/testing';

import { LieferstatusService } from './lieferstatus.service';

describe('LieferstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LieferstatusService = TestBed.get(LieferstatusService);
    expect(service).toBeTruthy();
  });
});
