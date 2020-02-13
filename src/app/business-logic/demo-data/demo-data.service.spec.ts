import { TestBed } from '@angular/core/testing';

import { DemoDataService } from './demo-data.service';
import { BusinessLogicModule } from '../business-logic.module';

describe('DemoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: DemoDataService = TestBed.get(DemoDataService);
    expect(service).toBeTruthy();
  });
});
