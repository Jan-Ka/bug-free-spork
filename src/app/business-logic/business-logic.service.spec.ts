import { BusinessLogicModule } from './business-logic.module';
import { BusinessLogicService } from './business-logic.service';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IRechnung, ILieferstatus, IRechnungsposition } from 'shared/shared.module';
import { RechnungService } from './rechnung/rechnung.service';
import { of } from 'rxjs';
import { RechnungspositionService } from './rechnungsposition/rechnungsposition.service';

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

      environment.demoData.rechnung = [
        expected as any
      ];

      const service: BusinessLogicService = TestBed.get(BusinessLogicService);

      service.filterRechnung(0, 1).subscribe((value) => {
        expect(value).toEqual([expected]);
        done();
      });
    });

    it('provides a method to receive \`Rechnungsposition\` for a given \`Rechnungs-UID\`', (done) => {
      const rechnungsUid = '123';

      const rechnung: IRechnung = {
        'Rechnungs-UID': rechnungsUid,
        Rechnungsnummer: 'ABC-123',
        Rechnungsempfänger: 'abc',
        Datum: new Date(),
        'Betrag Netto': 1337
      };

      const rechnungsposition: IRechnungsposition = {
        'Rechnungs-UID': rechnungsUid,
        'Produkt Name': 'Abc',
        'Produkt Betrag Netto': 1337.000
      };

      environment.demoData.rechnung = [
        rechnung as any
      ];

      environment.demoData.rechnungsposition = [
        rechnungsposition as any
      ];

      const service: BusinessLogicService = TestBed.get(BusinessLogicService);
      service.getAllRechnungsposition(rechnungsUid).subscribe((value) => {
        expect(value).toEqual([rechnungsposition]);
        done();
      });
    });
  });
});
