import { Component, OnInit, Input } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { Observable } from 'rxjs';
import { ILieferstatus } from 'shared/ILieferstatus';

@Component({
  selector: 'app-rechnungsposition-detail-table',
  templateUrl: './rechnungsposition-detail-table.component.html',
  styleUrls: ['./rechnungsposition-detail-table.component.scss']
})
export class RechnungspositionDetailTableComponent implements OnInit {
  displayedColumns = ['Produkt Name', 'Lieferstatus'];
  lieferstatusArray$: Observable<ILieferstatus[]>;

  @Input()
  rechnungsUID: string;

  constructor(private businessLogicService: BusinessLogicService) { }

  ngOnInit() {
    this.lieferstatusArray$ = this.businessLogicService.getAllRechnungLieferstatus(this.rechnungsUID);
  }

}
