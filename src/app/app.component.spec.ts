import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessLogicModule } from './business-logic/business-logic.module';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { GetDetailButtonTooltipPipe } from './rechnung-table/getDetailButtonTooltipPipe/get-detail-button-tooltip.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RechnungBetragNettoPipe } from './rechnung-betrag-netto.pipe';
import { RechnungTableComponent } from './rechnung-table/rechnung-table.component';
import { TestBed, async } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RechnungTableComponent,
        ErrorMessageComponent,
        GetDetailButtonTooltipPipe,
        RechnungBetragNettoPipe
      ],
      imports: [
        BrowserAnimationsModule,
        BusinessLogicModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bug-free-spork'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('bug-free-spork');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#app-title').textContent).toContain('bug-free-spork');
  });
});
