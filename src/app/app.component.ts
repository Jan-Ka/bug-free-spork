import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RechnungDataSource } from './rechnung-data-source';
import { IRechnung } from 'shared/IRechnung';
import { MatDialog } from '@angular/material/dialog';
import { BusinessLogicService } from './business-logic/business-logic.service';
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

  constructor(public dialog: MatDialog, private businessLogicService: BusinessLogicService) { }

  ngOnInit() {
    this.dataSource = new RechnungDataSource(this.businessLogicService);
  }

  handlePageEvent(e: PageEvent) {
    this.dataSource.filter(e.pageIndex, e.pageSize);
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
