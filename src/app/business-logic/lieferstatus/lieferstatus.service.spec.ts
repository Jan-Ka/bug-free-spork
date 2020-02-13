import { BusinessLogicModule } from '../business-logic.module';
import { LieferstatusService } from './lieferstatus.service';
import { TestBed } from '@angular/core/testing';

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
});
