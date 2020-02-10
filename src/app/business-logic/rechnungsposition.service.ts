import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRechnungsposition } from 'shared/shared.module';

interface IJsonRechnungsposition {
  'Rechnungs-UID': string;
  'Produkt Name': string;
  'Produkt Betrag Netto': string;
}

@Injectable({
  providedIn: 'root'
})
export class RechnungspositionService {

  private rechnungspositionDemoData: IRechnungsposition[];

  constructor() {
    if (environment.demoData !== null) {
      this.rechnungspositionDemoData = RechnungspositionService.reviveRechnungspositionDemoData(environment.demoData.rechnungsposition)
    } else {
      this.rechnungspositionDemoData = [];
    }
  }

  /**
   * Revive the imported demo data to the expected format
   * @param importedData data read from JSON Module
   */
  private static reviveRechnungspositionDemoData(importedData?: IJsonRechnungsposition[]): IRechnungsposition[] {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    return importedData.map((val: IJsonRechnungsposition) => {
      return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        'Produkt Name': val['Produkt Name'],
        'Produkt Betrag Netto': parseFloat(val['Produkt Betrag Netto'])
      };
    });
  }
}
