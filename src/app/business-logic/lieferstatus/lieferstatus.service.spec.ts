import { BusinessLogicModule } from '../business-logic.module';
import { LieferstatusService } from './lieferstatus.service';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

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
      environment.demoData = null;
      const service: LieferstatusService = TestBed.get(LieferstatusService);
      service.getAllRechnungLieferstatus('').subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
    });
  });
});
