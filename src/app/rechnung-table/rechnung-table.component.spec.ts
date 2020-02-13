import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { GetDetailButtonTooltipPipe } from './getDetailButtonTooltipPipe/get-detail-button-tooltip.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RechnungBetragNettoPipe } from '../rechnung-betrag-netto.pipe';
import { RechnungTableComponent } from './rechnung-table.component';

describe('RechnungTableComponent', () => {
  let component: RechnungTableComponent;
  let fixture: ComponentFixture<RechnungTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates it', () => {
    expect(component).toBeTruthy();
  });
});
