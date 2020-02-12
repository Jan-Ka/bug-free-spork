import { BusinessLogicService } from '../business-logic/business-logic.service';
import { Component, OnInit } from '@angular/core';
import { IRechnung } from 'shared/IRechnung';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { RechnungDataSource } from '../rechnung-data-source';
import {
  RechnungspositionDetailDialogComponent,
  IRechnungspositionDetailDialogData
} from '../rechnungsposition-detail-dialog/rechnungsposition-detail-dialog.component';

@Component({
  selector: 'app-rechnung-table',
  templateUrl: './rechnung-table.component.html',
  styleUrls: ['./rechnung-table.component.scss']
})
export class RechnungTableComponent implements OnInit {
  displayedColumns: string[] = ['Actions', 'Rechnungsnummer', 'Rechnungsempfänger', 'Betrag Netto', 'Datum'];
  dataSource: RechnungDataSource;
  pageSize = 10;

  constructor(public dialog: MatDialog, private businessLogicService: BusinessLogicService) { }

  ngOnInit() {
    this.dataSource = new RechnungDataSource(this.businessLogicService);
  }

  handlePageEvent(e: PageEvent) {
    this.dataSource.filter(e.pageIndex, e.pageSize);
  }

  openDetailsDialog(rechnung: IRechnung) {
    // console.log(row);
    const data: IRechnungspositionDetailDialogData = {
      'Rechnungs-UID': rechnung['Rechnungs-UID'],
      Rechnungsnummer: rechnung.Rechnungsnummer
    };

    this.dialog.open(RechnungspositionDetailDialogComponent, {
      width: '80vw',
      data
    });
  }
}
