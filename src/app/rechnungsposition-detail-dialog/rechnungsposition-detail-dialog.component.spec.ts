import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { ErrorMessageComponent } from '../error-message/error-message/error-message.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RechnungBetragNettoPipe } from '../rechnung-betrag-netto.pipe';
import { RechnungspositionDetailDialogComponent } from './rechnungsposition-detail-dialog.component';
import { RechnungspositionDetailTableComponent } from '../rechnungsposition-detail-table/rechnungsposition-detail-table.component';

describe('RechnungspositionDetailDialogComponent', () => {
  let component: RechnungspositionDetailDialogComponent;
  let fixture: ComponentFixture<RechnungspositionDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorMessageComponent,
        RechnungBetragNettoPipe,
        RechnungspositionDetailDialogComponent,
        RechnungspositionDetailTableComponent
      ],
      imports: [
        BrowserAnimationsModule,
        BusinessLogicModule,
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungspositionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
