import { Injectable, Injector } from '@angular/core';
import { RechnungService } from './rechnung.service';
import { Observable } from 'rxjs';
import { IRechnung } from 'shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {

  private rechnungService: RechnungService = null;

  constructor(private injector: Injector) { }

  filterRechnung(pageIndex: number, pageSize: number): Observable<IRechnung[]> {
    return this.getRechnungService().filter(pageIndex, pageSize);
  }

  availableRechnung(): Observable<number> {
    return this.getRechnungService().available();
  }

  private getRechnungService(): RechnungService {
    if (this.rechnungService === null) {
      this.rechnungService = this.injector.get(RechnungService);
    }

    return this.rechnungService;
  }
}
