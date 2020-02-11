import { Injectable } from '@angular/core';
import { ILieferstatus } from 'shared/ILieferstatus';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, withLatestFrom, finalize, toArray } from 'rxjs/operators';
import { RechnungspositionService } from './rechnungsposition.service';
import { IRechnungsposition } from 'shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class LieferstatusService {
  private lookup: Map<string, string> = new Map();
  private lieferstatusDemoData: ILieferstatus[];

  constructor(private rechnungspositionService: RechnungspositionService) {
    if (environment.demoData !== null) {
      this.lieferstatusDemoData = environment.demoData.lieferstatus;

      this.lookup = LieferstatusService.generateDemoDataLookup(this.lieferstatusDemoData);
    } else {
      this.lieferstatusDemoData = null;
    }
  }

  private static generateDemoDataLookup(source: ILieferstatus[]): Map<string, string> {
    const result = new Map(source.map((val) => {
      return [
        val['Produkt Name'],
        val.Lieferstatus
      ];
    }));

    return result;
  }

  /**
   * Retrieves Produkt Lieferstatus for a given Rechnungs-UID
   * @param id Rechnungs-UID
   */
  getAllRechnungLieferstatus(id: string): Observable<ILieferstatus[]> {
    return this.rechnungspositionService.getAllRechnungsposition(id).pipe(
      map((value) => {
        return {
          'Produkt Name': value['Produkt Name'],
          Lieferstatus: this.lookup.get(value['Produkt Name'])
        } as ILieferstatus;
      }),
      toArray()
    );
  }
}
