import { Injectable } from '@angular/core';
import { ILieferstatus } from 'shared/ILieferstatus';
import { environment } from 'src/environments/environment';
import { map, toArray, tap } from 'rxjs/operators';
import { RechnungspositionService } from './rechnungsposition.service';
import { Observable } from 'rxjs';

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
        return value.map((val) => {
          return {
            'Produkt Name': val['Produkt Name'],
            Lieferstatus: this.lookup.get(val['Produkt Name'])
          };
        });
      }),
    );
  }
}
