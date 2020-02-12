import { TestBed } from '@angular/core/testing';

import { RechnungspositionDetailService } from './rechnungsposition-detail.service';

describe('RechnungspositionDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechnungspositionDetailService = TestBed.get(RechnungspositionDetailService);
    expect(service).toBeTruthy();
  });
});
