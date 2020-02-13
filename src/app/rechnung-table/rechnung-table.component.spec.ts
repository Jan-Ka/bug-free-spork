import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { GetDetailButtonTooltipPipe } from './getDetailButtonTooltipPipe/get-detail-button-tooltip.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { of } from 'rxjs';
import { RechnungBetragNettoPipe } from '../pipes/rechnung-betrag-netto.pipe';
import { RechnungTableComponent } from './rechnung-table.component';

describe('RechnungTableComponent', () => {
  let component: RechnungTableComponent;
  let fixture: ComponentFixture<RechnungTableComponent>;
  const baseModuleConfig = {
    declarations: [
      ErrorMessageComponent,
      GetDetailButtonTooltipPipe,
      RechnungBetragNettoPipe,
      RechnungTableComponent
    ],
    imports: [
      BrowserAnimationsModule,
      BusinessLogicModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
      MatPaginatorModule,
      MatTableModule,
      MatTooltipModule,
    ]
  };

  it('creates it', () => {
    TestBed.configureTestingModule({
      ...baseModuleConfig
    })
      .compileComponents();

    fixture = TestBed.createComponent(RechnungTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('testing', () => {
    it('\`Rechnungs-UID\` available as data attribute on table row', () => {
      const rechnungsUID = [
        '123',
        '456',
        '789'
      ].sort();

      const mockBusinessLogicService = jasmine.createSpyObj('BusinessLogicService', ['filterRechnung', 'availableRechnung']);
      mockBusinessLogicService.filterRechnung.and.returnValue(
        of(rechnungsUID.map((val) => {
          return {
            'Rechnungs-UID': val,
            Rechnungsnummer: '',
            Rechnungsempfänger: '',
            'Betrag Netto': '0.000',
            Datum: new Date().toString()
          };
        }))
      );
      mockBusinessLogicService.availableRechnung.and.returnValue(of(rechnungsUID.length));

      TestBed.configureTestingModule({
        ...baseModuleConfig,
        providers: [
          { provide: BusinessLogicService, useValue: mockBusinessLogicService }
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(RechnungTableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // TODO: table rows should be accessible as DebugElements but are not for some reason?
      // const tableRows = fixture.debugElement.queryAll(By.css('tr[data-rechnungs-uid]'));
      const tableRows = fixture.nativeElement.querySelectorAll('tr[data-rechnungs-uid]');
      const foundRechnungsUID = [...tableRows].map((row) => row.dataset.rechnungsUid).sort();

      expect(foundRechnungsUID).toEqual(rechnungsUID);
    });
  });
});
