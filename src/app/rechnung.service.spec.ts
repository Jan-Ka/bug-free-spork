import { TestBed } from '@angular/core/testing';

import { RechnungService } from './rechnung.service';

describe('RechnungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechnungService = TestBed.get(RechnungService);
    expect(service).toBeTruthy();
  });
});
