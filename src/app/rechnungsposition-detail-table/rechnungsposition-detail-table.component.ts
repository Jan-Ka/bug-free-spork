import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  RechnungspositionDetailService,
  IRechnungspositionDetail
} from './rechnungsposition-detail-service/rechnungsposition-detail.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-rechnungsposition-detail-table',
  templateUrl: './rechnungsposition-detail-table.component.html',
  styleUrls: ['./rechnungsposition-detail-table.component.scss']
})
export class RechnungspositionDetailTableComponent implements OnInit {
  displayedColumns = ['Produkt Name', 'Produkt Betrag Netto', 'Lieferstatus'];
  rechnungspositionDetail$: Observable<IRechnungspositionDetail[]>;
  error = null;

  @Input()
  rechnungsUID: string;

  constructor(private rechnungspositionDetailService: RechnungspositionDetailService) { }

  ngOnInit() {
    this.rechnungspositionDetail$ = this.rechnungspositionDetailService.getRechnungspositionDetail(this.rechnungsUID).pipe(
      catchError((error) => {
        this.error = error;

        return of([]);
      })
    );
  }

}
