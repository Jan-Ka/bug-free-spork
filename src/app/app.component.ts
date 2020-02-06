import { Component } from '@angular/core';
import { IRechnung } from 'shared/IRechnung';

const StaticData: IRechnung[] = [
  {
    'Rechnungs-UID': '123abc',
    Rechnungsnummer: 'RECH-123',
    Rechnungsempfänger: 'Christopher Eo, Firma GmbH, Gebäudestraße 1, 1234 Stadtort',
    'Betrag Netto': 12,
    Datum: new Date()
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bug-free-spork';
  displayedColumns: string[] = ['Rechnungsnummer', 'Rechnungsempfänger', 'Betrag Netto', 'Datum'];
  dataSource = StaticData;
}
