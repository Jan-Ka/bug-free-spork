import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRechnung } from '../../shared/IRechnung';

const StaticData: IRechnung[] = [
  {
    'Rechnungs-UID': '123abc',
    Rechnungsnummer: 'RECH-123',
    Rechnungsempfänger: 'Christopher Eo, Firma GmbH, Gebäudestraße 1, 1234 Stadtort',
    'Betrag Netto': 12,
    Datum: new Date()
  }
];

@Injectable({
  providedIn: 'root'
})
export class RechnungService {
  private allRechnung: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
  private hot = false;

  constructor() { }

  getAllRechnung(): Observable<IRechnung[]> {
    // init the BehaviorSubject if service wasn't used before
    if (!this.hot) {
      this.allRechnung.next(StaticData);
      this.hot = true;
    }

    return this.allRechnung;
  }
}
