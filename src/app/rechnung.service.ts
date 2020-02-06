import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRechnung } from '../../shared/IRechnung';

import demoData from '../../rechnung_demo_2.json';

interface IJsonRechnung {
  'Rechnungs-UID': string;
  Rechnungsnummer: string;
  Rechnungsempfänger: string;
  'Betrag Netto': string;
  Datum: string;
}

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
      this.allRechnung.next(this.normalizeDemoJson(demoData));
      this.hot = true;
    }

    return this.allRechnung;
  }

  private normalizeDemoJson(rawJson: IJsonRechnung[]): IRechnung[] {
    return rawJson.map((val: IJsonRechnung) => {
      return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        Rechnungsnummer: val.Rechnungsnummer,
        Rechnungsempfänger: val.Rechnungsempfänger,
        'Betrag Netto': 0,
        Datum: new Date()
      };
    });
  }
}
