import { BusinessLogicService } from '../business-logic/business-logic.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface IRechnungspositionDetailDialogData {
  'Rechnungs-UID': string;
  Rechnungsnummer: string;
}

@Component({
  selector: 'app-rechnungsposition-detail-dialog',
  templateUrl: './rechnungsposition-detail-dialog.component.html',
  styleUrls: ['./rechnungsposition-detail-dialog.component.scss']
})
export class RechnungspositionDetailDialogComponent implements OnInit {
  rechnungspositionAvailable$: Observable<number>;

  RechnungsUID: string;

  Rechnungsnummer: string;

  constructor(
    public dialogRef: MatDialogRef<RechnungspositionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: IRechnungspositionDetailDialogData,
    private businessLogicService: BusinessLogicService) {
    this.RechnungsUID = data['Rechnungs-UID'];
    this.Rechnungsnummer = data.Rechnungsnummer;
  }

  ngOnInit() {
    this.rechnungspositionAvailable$ = this.businessLogicService.availableRechnungsposition(this.RechnungsUID);
  }

}
