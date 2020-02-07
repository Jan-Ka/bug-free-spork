import { Component, OnInit } from '@angular/core';
import { RechnungService } from './rechnung.service';
import { PageEvent } from '@angular/material/paginator';
import { RechnungDataSource } from './rechnung-data-source';

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

  constructor(private rechnungService: RechnungService) { }

  ngOnInit() {
    this.dataSource = new RechnungDataSource(this.rechnungService);
  }

  handlePageEvent(e: PageEvent) {
    this.rechnungService.filter(e.pageIndex, e.pageSize);
  }
}
