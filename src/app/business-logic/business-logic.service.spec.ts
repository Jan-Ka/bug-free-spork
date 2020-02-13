import { BusinessLogicModule } from './business-logic.module';
import { BusinessLogicService } from './business-logic.service';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IRechnung } from 'shared/shared.module';
import { RechnungService } from './rechnung/rechnung.service';
import { of } from 'rxjs';

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

  describe('business requirements', () => {
    it('provides a method to receive a filtered list of \`Rechnung\`', (done) => {
      const expected: IRechnung = {
        'Rechnungs-UID': '123',
        Rechnungsnummer: 'ABC-123',
        Rechnungsempfänger: 'abc',
        Datum: new Date(),
        'Betrag Netto': 1337
      };

      const rechnungSpy = jasmine.createSpyObj('RechnungService', ['filter']);
      rechnungSpy.filter.and.returnValue(
        of(
          [expected]
        )
      );

      TestBed.configureTestingModule({
        providers: [
          {
            provide: RechnungService, useValue: rechnungSpy
          }
        ]
      });

      const service: BusinessLogicService = TestBed.get(BusinessLogicService);

      service.filterRechnung(0, 1).subscribe((value) => {
        expect(value).toEqual([expected]);
        done();
      });
    });
  });
});
