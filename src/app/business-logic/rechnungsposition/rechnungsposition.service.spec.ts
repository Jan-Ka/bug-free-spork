import { TestBed } from '@angular/core/testing';

import { RechnungspositionService } from './rechnungsposition.service';

describe('RechnungspositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('is created', () => {
    const service: RechnungspositionService = TestBed.get(RechnungspositionService);
    expect(service).toBeTruthy();
  });
});
