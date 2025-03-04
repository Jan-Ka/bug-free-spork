import { BusinessLogicService } from '../business-logic/business-logic.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IRechnung } from 'shared/IRechnung';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RechnungDataSource } from './rechnung-data-source/rechnung-data-source';
import {
  RechnungspositionDetailDialogComponent,
  IRechnungspositionDetailDialogData
} from '../rechnungsposition-detail-dialog/rechnungsposition-detail-dialog.component';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rechnung-table',
  templateUrl: './rechnung-table.component.html',
  styleUrls: ['./rechnung-table.component.scss']
})
export class RechnungTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Actions', 'Rechnungsnummer', 'Rechnungsempfänger', 'Betrag Netto', 'Datum'];
  dataSource: RechnungDataSource;
  pageSize = 10;
  available = 0;
  pageSizeOptions = [10, 25, 50, 100];
  error = null;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  loading$: Observable<boolean>;

  constructor(public dialog: MatDialog, private businessLogicService: BusinessLogicService) { }

  ngOnInit() {
    this.dataSource = new RechnungDataSource(this.businessLogicService);
    this.loading$ = this.dataSource.getLoading();

    this.dataSource.filter(0, 10);
    this.dataSource.getAvailable().subscribe((value) => {
      this.available = value;
    });
    this.dataSource.getError().subscribe((error) => {
      this.error = error;
    });
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadRechnung())
    ).subscribe();
  }

  loadRechnung() {
    this.dataSource.filter(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openDetailsDialog(rechnung: IRechnung) {
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
