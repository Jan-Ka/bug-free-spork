import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { IRechnungsposition } from 'shared/shared.module';
import { Observable } from 'rxjs';

export interface IRechnungpositionDetailDialogData {
  'Rechnungs-UID': string;
  Rechnungsnummer: string;
}

@Component({
  selector: 'app-rechnungposition-detail-dialog',
  templateUrl: './rechnungposition-detail-dialog.component.html',
  styleUrls: ['./rechnungposition-detail-dialog.component.scss']
})
export class RechnungpositionDetailDialogComponent implements OnInit {
  displayedColumns = ['Produkt Name', 'Produkt Betrag Netto'];
  rechnungspositionArray$: Observable<IRechnungsposition[]>;

  private rechnungsUid: string;

  rechnungsnummer: string;

  constructor(
    private businessLogicService: BusinessLogicService,
    public dialogRef: MatDialogRef<RechnungpositionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: IRechnungpositionDetailDialogData) {
    this.rechnungsUid = data['Rechnungs-UID'];
    this.rechnungsnummer = data.Rechnungsnummer;
  }

  ngOnInit() {
    this.rechnungspositionArray$ = this.businessLogicService.getAllRechnungsposition(this.rechnungsUid);
  }

  close() {
    this.dialogRef.close();
  }

}
