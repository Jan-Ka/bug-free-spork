import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BusinessLogicModule } from './business-logic.module';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IRechnungsposition } from 'shared/shared.module';

interface IJsonRechnungsposition {
  'Rechnungs-UID': string;
  'Produkt Name': string;
  'Produkt Betrag Netto': string;
}

@Injectable({
  providedIn: BusinessLogicModule
})
export class RechnungspositionService {

  constructor() {
    if (environment.demoData !== null) {
      this.rechnungspositionDemoData = RechnungspositionService.reviveRechnungspositionDemoData(environment.demoData.rechnungsposition);

      this.indexMap = RechnungspositionService.generateDemoDataIndices(this.rechnungspositionDemoData);
    } else {
      this.rechnungspositionDemoData = [];
    }
  }
  private allRechnungsposition: BehaviorSubject<IRechnungsposition[]> = new BehaviorSubject([]);

  /**
   * Contains all rechnungspositionDemoData index for a given Rechnungs-UID
   * to speed up search within demo data
   */
  private indexMap: Map<string, number[]> = new Map();
  private rechnungspositionDemoData: IRechnungsposition[];

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

  private static generateDemoDataIndices(source: IRechnungsposition[]): Map<string, number[]> {
    const result = new Map();

    for (let i = 0; i < source.length; i++) {
      const rechnungsposition = source[i];

      if (!result.has(rechnungsposition['Rechnungs-UID'])) {
        result.set(rechnungsposition['Rechnungs-UID'], [
          i
        ]);

        continue;
      }

      result.get(rechnungsposition['Rechnungs-UID']).push(i);
    }

    return result;
  }

  private static getDemoDataByIndices(indices: number[], source: IRechnungsposition[]): IRechnungsposition[] {
    const result = [];

    indices.sort((a, b) => a - b);

    // maybe group by continuing indices and splice?
    // filter by index?
    for (const index of indices) {
      result.push(source[index]);
    }

    return result;
  }

  getAllRechnungsposition(id: string): Observable<IRechnungsposition[]> {
    const indices = this.indexMap.get(id);

    if (!Array.isArray(indices)) {
      return throwError(`ArgumentException: ${id} is not a valid 'Rechnungs-UID'`);
    }

    const demoDataByIndices = RechnungspositionService.getDemoDataByIndices(indices, this.rechnungspositionDemoData);

    this.allRechnungsposition.next(demoDataByIndices);

    return this.allRechnungsposition.asObservable();
  }
}
