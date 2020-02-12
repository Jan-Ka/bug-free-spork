import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BusinessLogicModule } from './business-logic/business-logic.module';

import { RechnungspositionDetailDialogComponent } from './rechnungsposition-detail-dialog/rechnungsposition-detail-dialog.component';
import { RechnungspositionDetailTableComponent } from './rechnungsposition-detail-table/rechnungsposition-detail-table.component';
import { RechnungTableComponent } from './rechnung-table/rechnung-table.component';
import { RechnungBetragNettoPipe } from './rechnung-betrag-netto.pipe';
import { GetDetailButtonTooltipPipe } from './rechnung-table/getDetailButtonTooltipPipe/get-detail-button-tooltip.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RechnungspositionDetailDialogComponent,
    RechnungspositionDetailTableComponent,
    RechnungTableComponent,
    RechnungBetragNettoPipe,
    GetDetailButtonTooltipPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BusinessLogicModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RechnungspositionDetailDialogComponent]
})
export class AppModule { }
