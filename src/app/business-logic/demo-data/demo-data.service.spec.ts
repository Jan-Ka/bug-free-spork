import { TestBed } from '@angular/core/testing';

import { DemoDataService } from './demo-data.service';

describe('DemoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('creates it', () => {
    const service: DemoDataService = TestBed.get(DemoDataService);
    expect(service).toBeTruthy();
  });
});
