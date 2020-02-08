import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRechnung } from '../../shared/IRechnung';
import { environment } from 'src/environments/environment';


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
  private filterRechnung: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
  private availableRechnung: BehaviorSubject<number> = new BehaviorSubject(0);

  private fullDemoData: IRechnung[];

  constructor() {
    if (environment.demoData !== null) {
      this.fullDemoData = this.normalizeDemoJson(environment.demoData.rechnung);
    } else {
      this.fullDemoData = [];
    }
  }

  getAllRechnung(): Observable<IRechnung[]> {
    return this.allRechnung.asObservable();
  }

  filter(pageIndex: number, pageSize: number): Observable<IRechnung[]> {
    const chunkOffset = pageIndex * pageSize;
    this.filterRechnung.next(this.fullDemoData.slice(chunkOffset, chunkOffset + pageSize));

    return this.filterRechnung.asObservable();
  }

  available(): Observable<number> {
    this.availableRechnung.next(this.fullDemoData.length);

    return this.availableRechnung.asObservable();
  }

  private normalizeDemoJson(rawJson?: IJsonRechnung[]): IRechnung[] {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    return rawJson.map((val: IJsonRechnung) => {
      return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        Rechnungsnummer: val.Rechnungsnummer,
        Rechnungsempfänger: val.Rechnungsempfänger,
        'Betrag Netto': parseFloat(val['Betrag Netto']),
        Datum: new Date(val.Datum)
      };
    });
  }
}
