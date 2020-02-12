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

import { BusinessLogicModule } from './business-logic/business-logic.module';

import { RechnungpositionDetailDialogComponent } from './rechnungposition-detail-dialog/rechnungposition-detail-dialog.component';
import { LieferstatusTableComponent } from './lieferstatus-table/lieferstatus-table.component';

@NgModule({
  declarations: [
    AppComponent,
    RechnungpositionDetailDialogComponent,
    LieferstatusTableComponent
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
    BusinessLogicModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RechnungpositionDetailDialogComponent]
})
export class AppModule { }
