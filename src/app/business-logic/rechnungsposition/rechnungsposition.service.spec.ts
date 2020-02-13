import { TestBed } from '@angular/core/testing';

import { RechnungspositionService } from './rechnungsposition.service';
import { environment } from 'src/environments/environment';

describe('RechnungspositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('is created', () => {
    const service: RechnungspositionService = TestBed.get(RechnungspositionService);
    expect(service).toBeTruthy();
  });

  describe('getAllRechnungsposition', () => {
    it('returns empty array on no result', (done) => {
      environment.demoData = null;
      const service: RechnungspositionService = TestBed.get(RechnungspositionService);
      service.getAllRechnungsposition('').subscribe((value) => {
        expect(value).toBe([]);
        done();
      });
    });
  });
});
