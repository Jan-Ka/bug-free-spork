import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../../business-logic/business-logic.service';
import { IRechnungsposition, ILieferstatus } from 'shared/shared.module';
import { Observable, forkJoin, BehaviorSubject, of, combineLatest, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface IRechnungspositionDetail extends IRechnungsposition, ILieferstatus {
}

@Injectable({
  providedIn: 'root'
})
export class RechnungspositionDetailService {
  private rechnungspositionDetail: BehaviorSubject<IRechnungspositionDetail[]> = new BehaviorSubject([]);

  constructor(private businessLogicService: BusinessLogicService) { }

  /**
   * Receive all `IRechnungspositionDetail` for provided `Rechnungs-UID`
   * @param id `Rechnungs-UID`
   */
  getRechnungspositionDetail(id: string): Observable<IRechnungspositionDetail[]> {
    return combineLatest(
      this.businessLogicService.getAllRechnungsposition(id),
      this.businessLogicService.getAllRechnungLieferstatus(id)
    ).pipe(
      map(([rechnungsposition, rechnungLieferstatus]) => {
        const lieferstatusMap = new Map<string, string>(rechnungLieferstatus.map((value) => {
          return [
            value['Produkt Name'],
            value.Lieferstatus
          ];
        }));

        const rechnungspositionDetail = rechnungsposition.map((value) => {
          const lieferstatus = lieferstatusMap.get(value['Produkt Name']);

          return {
            ...value,
            Lieferstatus: lieferstatus
          } as IRechnungspositionDetail;
        });

        return rechnungspositionDetail;
      })
    );
  }
}
