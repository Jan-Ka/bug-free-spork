import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { BusinessLogicModule } from '../business-logic.module';
import { DemoDataService } from 'src/app/business-logic/demo-data/demo-data.service';
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
  private allRechnungsposition: BehaviorSubject<IRechnungsposition[]> = new BehaviorSubject([]);
  private availableRechnungspositionSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Contains all rechnungspositionDemoData index for a given Rechnungs-UID
   * to speed up search within demo data
   */
  private readonly indexMap: Map<string, number[]> = new Map();
  private readonly rechnungspositionDemoData: IRechnungsposition[];

  constructor(private demoDataService: DemoDataService) {
    this.rechnungspositionDemoData = [];
    RechnungspositionService.reviveRechnungspositionDemoData(this.rechnungspositionDemoData, this.demoDataService.getRechnungsposition());
    RechnungspositionService.generateDemoDataIndices(this.indexMap, this.rechnungspositionDemoData);
  }

  /**
   * Revive the imported demo data to the expected format
   * @param importedData data read from JSON Module
   */
  private static reviveRechnungspositionDemoData(target: IRechnungsposition[], importedData?: IJsonRechnungsposition[]): void {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    // --
    // until we get something like Array.addRange we have to apply some workaround
    // to update target instead of overwriting it
    // benchmarked this, 0.331ms|0.372ms|0.334ms for 1350 items
    target.splice.apply(target, [
      0,
      1,
      ...importedData.map((val: IJsonRechnungsposition) => {
        return {
          'Rechnungs-UID': val['Rechnungs-UID'],
          'Produkt Name': val['Produkt Name'],
          'Produkt Betrag Netto': parseFloat(val['Produkt Betrag Netto'])
        };
      })
    ]);
  }

  /**
   * Generate a Map to find the indices of 'Rechnungs-UID' occurences in source
   */
  private static generateDemoDataIndices(target: Map<string, number[]>, source: IRechnungsposition[]): void {
    source.forEach((rechnungsposition, index) => {
      const rechnungsUID = rechnungsposition['Rechnungs-UID'];

      if (!target.has(rechnungsUID)) {
        target.set(rechnungsUID, [
          index
        ]);

        return;
      }

      target.get(rechnungsUID).push(index);
    });
  }

  private static getDemoDataByIndices(indices: number[], source: IRechnungsposition[]): IRechnungsposition[] {
    const result = [];

    // could probably be faster by grouping the indices for consecutive numbers and slicing
    // for what we are doing currently, it's plenty fast
    // benchmarked this, average of 0.01ms for 40 items
    indices
      .sort((a, b) => a - b)
      .forEach((index) => {
        result.push(source[index]);
      });

    return result;
  }

  /**
   * Receive all `IRechnungsposition` for provided `Rechnungs-UID`
   * @param id `Rechnungs-UID`
   */
  getAllRechnungsposition(id: string): Observable<IRechnungsposition[]> {
    const indices = this.indexMap.get(id);

    if (!Array.isArray(indices)) {
      // there weren't any indices
      // either the key is wrong or there are no `Rechnungsposition` to be found
      return of([]);
    }

    const demoDataByIndices = RechnungspositionService.getDemoDataByIndices(indices, this.rechnungspositionDemoData);

    this.allRechnungsposition.next(demoDataByIndices);

    return this.allRechnungsposition.asObservable();
  }

  getAvailable(id: string): Observable<number> {
    const indices = this.indexMap.get(id);

    if (!Array.isArray(indices)) {
      // there weren't any indices
      // either the key is wrong or there are no `Rechnungsposition` to be found
      return of(0);
    }

    const demoDataByIndices = RechnungspositionService.getDemoDataByIndices(indices, this.rechnungspositionDemoData);

    this.availableRechnungspositionSubject.next(demoDataByIndices.length);

    return this.availableRechnungspositionSubject.asObservable();
  }
}
