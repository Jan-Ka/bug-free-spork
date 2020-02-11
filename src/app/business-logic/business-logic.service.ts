import { Injectable, Injector, Type, InjectionToken } from '@angular/core';
import { RechnungService } from './rechnung.service';
import { Observable } from 'rxjs';
import { IRechnung, IRechnungsposition, ILieferstatus } from 'shared/shared.module';
import { RechnungspositionService } from './rechnungsposition.service';
import { LieferstatusService } from './lieferstatus.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {

  private rechnungService: RechnungService = null;
  private rechnungspositionService: RechnungspositionService = null;
  private lieferstatusService: LieferstatusService = null;

  constructor(private injector: Injector) { }

  /**
   * Shortcut to load Service by token
   * @param target singleton target
   */
  private static retrieveService<TService>(injector: Injector, token: Type<TService> | InjectionToken<TService>, target: TService) {
    if (target === null) {
      target = injector.get(token);
    }

    return target;
  }

  /**
   * Retrieve a page of `IRechnung`
   * @param pageIndex offset of first item
   * @param pageSize max number of received items
   */
  filterRechnung(pageIndex: number, pageSize: number): Observable<IRechnung[]> {
    return this.getRechnungService().filter(pageIndex, pageSize);
  }

  /**
   * Retrieve total count of available `IRechnung`
   */
  availableRechnung(): Observable<number> {
    return this.getRechnungService().available();
  }

  /**
   * Receive all `IRechnungsposition` for provided `Rechnungs-UID`
   * @param id `Rechnungs-UID`
   */
  getAllRechnungsposition(id: string): Observable<IRechnungsposition[]> {
    return this.getRechnungspositionService().getAllRechnungsposition(id);
  }

  /**
   * Receive all `ILieferstatus` for provided `Rechnungs-UID`
   * @param id 'Rechnungs-UID'
   */
  getAllRechnungLieferstatus(id: string): Observable<ILieferstatus[]> {
    return this.getLieferstatusService().getAllRechnungLieferstatus(id);
  }

  private getRechnungService(): RechnungService {
    return BusinessLogicService.retrieveService(this.injector, RechnungService, this.rechnungService);
  }

  private getRechnungspositionService(): RechnungspositionService {
    return BusinessLogicService.retrieveService(this.injector, RechnungspositionService, this.rechnungspositionService);
  }

  private getLieferstatusService(): LieferstatusService {
    return BusinessLogicService.retrieveService(this.injector, LieferstatusService, this.lieferstatusService);
  }
}
