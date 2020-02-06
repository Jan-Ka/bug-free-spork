import { Component, OnInit } from '@angular/core';
import { IRechnung } from 'shared/IRechnung';
import { RechnungService } from './rechnung.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bug-free-spork';
  displayedColumns: string[] = ['Rechnungsnummer', 'Rechnungsempfänger', 'Betrag Netto', 'Datum'];
  dataSource: Observable<IRechnung[]>;

  constructor(private rechnungService: RechnungService) { }

  ngOnInit() {
    this.dataSource = this.rechnungService.getAllRechnung();
  }
}
