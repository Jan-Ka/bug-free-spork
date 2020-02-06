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

  private normalizeDemoJson(rawJson?: IJsonRechnung[]): IRechnung[] {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    return rawJson.map((val: IJsonRechnung) => {
      return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        // the content of `Rechnungsnummer` isn't really important
        // but we expect strings of equal length
        // `Rechnungs-UID` should be a GUID normally and we can use the last
        // segment to simulate a 0-padded `Rechnungsnummer`
        Rechnungsnummer: `DEMO-${val['Rechnungs-UID'].split('-').slice(-1).join()}`,
        Rechnungsempfänger: val.Rechnungsempfänger,
        'Betrag Netto': parseFloat(val['Betrag Netto']),
        Datum: new Date(val.Datum)
      };
    });
  }
}
