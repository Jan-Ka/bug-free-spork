import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { IRechnungsposition, ILieferstatus } from 'shared/shared.module';
import { Observable, forkJoin, BehaviorSubject, of, combineLatest } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    combineLatest(
      this.businessLogicService.getAllRechnungsposition(id),
      this.businessLogicService.getAllRechnungLieferstatus(id)
    ).pipe(
      catchError(error => of(error))
    ).subscribe(([rechnungsposition, rechnungLieferstatus]) => {
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

      this.rechnungspositionDetail.next(rechnungspositionDetail);
    });

    return this.rechnungspositionDetail.asObservable();
  }
}
