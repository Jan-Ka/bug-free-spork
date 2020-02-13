import { BusinessLogicModule } from 'src/app/business-logic/business-logic.module';
import { RechnungspositionDetailService } from './rechnungsposition-detail.service';
import { TestBed } from '@angular/core/testing';

describe('RechnungspositionDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: RechnungspositionDetailService = TestBed.get(RechnungspositionDetailService);
    expect(service).toBeTruthy();
  });
});
