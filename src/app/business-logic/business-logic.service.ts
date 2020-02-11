import { Injectable, Injector } from '@angular/core';
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

  filterRechnung(pageIndex: number, pageSize: number): Observable<IRechnung[]> {
    return this.getRechnungService().filter(pageIndex, pageSize);
  }

  availableRechnung(): Observable<number> {
    return this.getRechnungService().available();
  }

  getAllRechnungsposition(id: string): Observable<IRechnungsposition[]> {
    return this.getRechnungspositionService().getAllRechnungsposition(id);
  }

  getAllRechnungLieferstatus(id: string): Observable<ILieferstatus[]> {
    return this.getLieferstatusService().getAllRechnungLieferstatus(id);
  }

  private getRechnungService(): RechnungService {
    if (this.rechnungService === null) {
      this.rechnungService = this.injector.get(RechnungService);
    }

    return this.rechnungService;
  }

  private getRechnungspositionService(): RechnungspositionService {
    if (this.rechnungspositionService === null) {
      this.rechnungspositionService = this.injector.get(RechnungspositionService);
    }

    return this.rechnungspositionService;
  }

  private getLieferstatusService(): LieferstatusService {
    if (this.lieferstatusService === null) {
      this.lieferstatusService = this.injector.get(LieferstatusService);
    }

    return this.lieferstatusService;
  }
}
