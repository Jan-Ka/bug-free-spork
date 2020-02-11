import { BusinessLogicModule } from './business-logic.module';
import { environment } from 'src/environments/environment';
import { ILieferstatus } from 'shared/ILieferstatus';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RechnungspositionService } from './rechnungsposition.service';

@Injectable({
  providedIn: BusinessLogicModule
})
export class LieferstatusService {
  private readonly lookup: Map<string, string> = new Map();
  private readonly lieferstatusDemoData: ILieferstatus[];

  constructor(private rechnungspositionService: RechnungspositionService) {
    // retrieve lieferstatus demo data if available
    this.lieferstatusDemoData = environment.demoData !== null ? environment.demoData.lieferstatus : [];
  }

  private static populateLieferstatusLookup(target: Map<string, string>, source: ILieferstatus[]): void {
    source
      .map((lieferstatus) => {
        return [
          lieferstatus['Produkt Name'],
          lieferstatus.Lieferstatus
        ];
      })
      .forEach((kvp) => {
        target.set.apply(target, kvp);
      });
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
            Lieferstatus: this.getLieferstatusForProduktName(val['Produkt Name'])
          };
        });
      }),
    );
  }

  private getLieferstatusForProduktName(produktName: string): string {
    if (this.lookup.size === 0) {
      LieferstatusService.populateLieferstatusLookup(this.lookup, this.lieferstatusDemoData);
    }

    return this.lookup.get(produktName);
  }
}
