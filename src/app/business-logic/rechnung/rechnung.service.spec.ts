import { BusinessLogicModule } from '../business-logic.module';
import { RechnungService } from './rechnung.service';
import { TestBed } from '@angular/core/testing';

describe('RechnungService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: RechnungService = TestBed.get(RechnungService);
    expect(service).toBeTruthy();
  });
});
