import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RechnungspositionDetailService, IRechnungspositionDetail } from './rechnungsposition-detail.service';

@Component({
  selector: 'app-rechnungsposition-detail-table',
  templateUrl: './rechnungsposition-detail-table.component.html',
  styleUrls: ['./rechnungsposition-detail-table.component.scss']
})
export class RechnungspositionDetailTableComponent implements OnInit {
  displayedColumns = ['Produkt Name', 'Produkt Betrag Netto', 'Lieferstatus'];
  rechnungspositionDetail$: Observable<IRechnungspositionDetail[]>;

  @Input()
  rechnungsUID: string;

  constructor(private rechnungspositionDetailService: RechnungspositionDetailService) { }

  ngOnInit() {
    this.rechnungspositionDetail$ = this.rechnungspositionDetailService.getRechnungspositionDetail(this.rechnungsUID);
  }

}
