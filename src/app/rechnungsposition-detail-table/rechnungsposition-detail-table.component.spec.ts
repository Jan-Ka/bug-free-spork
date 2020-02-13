import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungspositionDetailTableComponent } from './rechnungsposition-detail-table.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { MatTableModule } from '@angular/material/table';
import { RechnungBetragNettoPipe } from '../pipes/rechnung-betrag-netto.pipe';
import { BusinessLogicModule } from '../business-logic/business-logic.module';

describe('RechnungspositionDetailTableComponent', () => {
  let component: RechnungspositionDetailTableComponent;
  let fixture: ComponentFixture<RechnungspositionDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RechnungspositionDetailTableComponent,
        ErrorMessageComponent,
        RechnungBetragNettoPipe
      ],
      imports: [
        BusinessLogicModule,
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungspositionDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates it', () => {
    expect(component).toBeTruthy();
  });
});
