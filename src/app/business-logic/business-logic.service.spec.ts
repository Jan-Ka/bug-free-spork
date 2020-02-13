import { BusinessLogicModule } from './business-logic.module';
import { BusinessLogicService } from './business-logic.service';
import { DemoDataService } from './demo-data/demo-data.service';
import { IRechnung, ILieferstatus, IRechnungsposition } from 'shared/shared.module';
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

  describe('business requirements', () => {
    it('provides a method to receive a filtered list of \`Rechnung\`', (done) => {
      const expected: IRechnung = {
        'Rechnungs-UID': '123',
        Rechnungsnummer: 'ABC-123',
        Rechnungsempfänger: 'abc',
        Datum: new Date(),
        'Betrag Netto': 1337
      };

      const mockDemoDataService = jasmine.createSpyObj('DemoDataService', ['getRechnung']);
      mockDemoDataService.getRechnung.and.returnValue([
        expected
      ]);

      TestBed.configureTestingModule({
        providers: [
          { provide: DemoDataService, useValue: mockDemoDataService }
        ]
      });

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

      const mockDemoDataService = jasmine.createSpyObj('DemoDataService', ['getRechnung', 'getRechnungsposition']);
      mockDemoDataService.getRechnung.and.returnValue([
        rechnung
      ]);
      mockDemoDataService.getRechnungsposition.and.returnValue([
        rechnungsposition
      ]);

      TestBed.configureTestingModule({
        providers: [
          { provide: DemoDataService, useValue: mockDemoDataService }
        ]
      });

      const service: BusinessLogicService = TestBed.get(BusinessLogicService);
      service.getAllRechnungsposition(rechnungsUid).subscribe((value) => {
        expect(value).toEqual([rechnungsposition]);
        done();
      });
    });

    it('provides a method to receive \`Lieferstatus\` for a given \`Rechnungs-UID\`', (done) => {
      const rechnungsUid = '123';
      const produktName = 'Abc';

      const rechnung: IRechnung = {
        'Rechnungs-UID': rechnungsUid,
        Rechnungsnummer: 'ABC-123',
        Rechnungsempfänger: 'abc',
        Datum: new Date(),
        'Betrag Netto': 1337
      };

      const rechnungsposition: IRechnungsposition = {
        'Rechnungs-UID': rechnungsUid,
        'Produkt Name': produktName,
        'Produkt Betrag Netto': 1337.000
      };

      const lieferstatus: ILieferstatus = {
        'Produkt Name': produktName,
        Lieferstatus: 'Test'
      };

      const mockDemoDataService = jasmine.createSpyObj('DemoDataService', ['getRechnung', 'getRechnungsposition', 'getLieferstatus']);
      mockDemoDataService.getRechnung.and.returnValue([
        rechnung
      ]);
      mockDemoDataService.getRechnungsposition.and.returnValue([
        rechnungsposition
      ]);
      mockDemoDataService.getLieferstatus.and.returnValue([
        lieferstatus
      ]);

      TestBed.configureTestingModule({
        providers: [
          { provide: DemoDataService, useValue: mockDemoDataService }
        ]
      });

      const service: BusinessLogicService = TestBed.get(BusinessLogicService);
      service.getAllRechnungLieferstatus(rechnungsUid).subscribe((value) => {
        expect(value).toEqual([lieferstatus]);
        done();
      });
    });
  });
});
