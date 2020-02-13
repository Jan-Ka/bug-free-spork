import { TestBed } from '@angular/core/testing';

import { RechnungspositionService } from './rechnungsposition.service';
import { environment } from 'src/environments/environment';
import { BusinessLogicModule } from '../business-logic.module';

describe('RechnungspositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: RechnungspositionService = TestBed.get(RechnungspositionService);
    expect(service).toBeTruthy();
  });

  describe('getAllRechnungsposition', () => {
    it('returns empty array on no result', (done) => {
      environment.demoData = null;
      const service: RechnungspositionService = TestBed.get(RechnungspositionService);
      service.getAllRechnungsposition('').subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
    });
  });
});
