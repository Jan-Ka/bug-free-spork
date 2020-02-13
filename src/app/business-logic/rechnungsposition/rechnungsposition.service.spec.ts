import { BusinessLogicModule } from '../business-logic.module';
import { DemoDataService } from '../demo-data/demo-data.service';
import { RechnungspositionService } from './rechnungsposition.service';
import { TestBed } from '@angular/core/testing';

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
      const mockDemoDataService = jasmine.createSpyObj('DemoDataService', ['getRechnungsposition']);
      mockDemoDataService.getRechnungsposition.and.returnValue([]);

      TestBed.configureTestingModule({
        providers: [
          { provide: DemoDataService, useValue: mockDemoDataService }
        ]
      });

      const service: RechnungspositionService = TestBed.get(RechnungspositionService);
      service.getAllRechnungsposition('').subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
    });
  });
});
