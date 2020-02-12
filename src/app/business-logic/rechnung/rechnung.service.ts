import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessLogicModule } from '../business-logic.module';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IRechnung } from '../../../../shared/IRechnung';

interface IJsonRechnung {
  'Rechnungs-UID': string;
  Rechnungsnummer: string;
  Rechnungsempfänger: string;
  'Betrag Netto': string;
  Datum: string;
}

@Injectable({
  providedIn: BusinessLogicModule
})
export class RechnungService {
  private filterRechnung: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
  private availableRechnung: BehaviorSubject<number> = new BehaviorSubject(0);

  private rechnungDemoData: IRechnung[];

  constructor() {
    this.rechnungDemoData = environment.demoData !== null ? RechnungService.reviveRechnungDemoData(environment.demoData.rechnung) : [];
  }

  /**
   * Revive the imported demo data to the expected format
   * @param importedData data read from JSON Module
   */
  private static reviveRechnungDemoData(importedData?: IJsonRechnung[]): IRechnung[] {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    return importedData.map((val: IJsonRechnung) => {
      return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        Rechnungsnummer: val.Rechnungsnummer,
        Rechnungsempfänger: val.Rechnungsempfänger,
        'Betrag Netto': parseFloat(val['Betrag Netto']),
        Datum: new Date(val.Datum)
      };
    });
  }

  /**
   * Retrieve a page of `IRechnung`
   * @param pageIndex offset of first item
   * @param pageSize max number of received items
   */
  filter(pageIndex: number, pageSize: number): Observable<IRechnung[]> {
    const chunkOffset = pageIndex * pageSize;
    this.filterRechnung.next(this.rechnungDemoData.slice(chunkOffset, chunkOffset + pageSize));

    return this.filterRechnung.asObservable();
  }

  /**
   * Retrieve total count of available `IRechnung`
   */
  available(): Observable<number> {
    this.availableRechnung.next(this.rechnungDemoData.length);

    return this.availableRechnung.asObservable();
  }
}
