import { BusinessLogicModule } from './business-logic.module';
import { BusinessLogicService } from './business-logic.service';
import { TestBed } from '@angular/core/testing';

describe('BusinessLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BusinessLogicModule
    ]
  }));

  it('creates it', () => {
    const service: BusinessLogicService = TestBed.get(BusinessLogicService);
    expect(service).toBeTruthy();
  });
});
