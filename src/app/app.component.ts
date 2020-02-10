import { Component, OnInit } from '@angular/core';
import { RechnungService } from './business-logic/rechnung.service';
import { PageEvent } from '@angular/material/paginator';
import { RechnungDataSource } from './rechnung-data-source';
import { IRechnung } from 'shared/IRechnung';
import { MatDialog } from '@angular/material/dialog';
import {
  RechnungpositionDetailDialogComponent,
  IRechnungpositionDetailDialogData
} from './rechnungposition-detail-dialog/rechnungposition-detail-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bug-free-spork';
  displayedColumns: string[] = ['Rechnungsnummer', 'Rechnungsempfänger', 'Betrag Netto', 'Datum'];
  dataSource: RechnungDataSource;
  pageSize = 10;

  constructor(public dialog: MatDialog, private rechnungService: RechnungService) { }

  ngOnInit() {
    this.dataSource = new RechnungDataSource(this.rechnungService);
  }

  handlePageEvent(e: PageEvent) {
    this.rechnungService.filter(e.pageIndex, e.pageSize);
  }

  handleClick(row: IRechnung) {
    // console.log(row);
    const data: IRechnungpositionDetailDialogData = {
      'Rechnungs-UID': row['Rechnungs-UID'],
      Rechnungsnummer: row.Rechnungsnummer
    };

    const dialogRef = this.dialog.open(RechnungpositionDetailDialogComponent, {
      data
    });
  }
}
