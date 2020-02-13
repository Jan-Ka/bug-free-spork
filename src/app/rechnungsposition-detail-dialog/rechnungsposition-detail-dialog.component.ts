import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  RechnungsUID: string;

  Rechnungsnummer: string;

  constructor(
    public dialogRef: MatDialogRef<RechnungspositionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: IRechnungspositionDetailDialogData) {
    this.RechnungsUID = data['Rechnungs-UID'];
    this.Rechnungsnummer = data.Rechnungsnummer;
  }

  ngOnInit() {
  }

}
