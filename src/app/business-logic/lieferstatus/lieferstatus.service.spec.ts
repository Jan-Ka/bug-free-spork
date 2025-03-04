import { BusinessLogicModule } from '../business-logic.module';
import { LieferstatusService } from './lieferstatus.service';
import { TestBed } from '@angular/core/testing';
import { DemoDataService } from '../demo-data/demo-data.service';

describe('LieferstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: LieferstatusService = TestBed.get(LieferstatusService);
    expect(service).toBeTruthy();
  });

  describe('getAllRechnungLieferstatus', () => {
    it('returns empty array on no result', (done) => {

      const mockDemoDataService = jasmine.createSpyObj('DemoDataService', ['getRechnungsposition', 'getLieferstatus']);
      mockDemoDataService.getRechnungsposition.and.returnValue([]);
      mockDemoDataService.getLieferstatus.and.returnValue([]);

      TestBed.configureTestingModule({
        providers: [
          { provide: DemoDataService, useValue: mockDemoDataService }
        ]
      });

      const service: LieferstatusService = TestBed.get(LieferstatusService);
      service.getAllRechnungLieferstatus('').subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
    });
  });
});
