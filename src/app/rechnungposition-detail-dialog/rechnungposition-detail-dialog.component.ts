import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IRechnungpositionDetailDialogData {
  Rechnungsnummer: string;
}

@Component({
  selector: 'app-rechnungposition-detail-dialog',
  templateUrl: './rechnungposition-detail-dialog.component.html',
  styleUrls: ['./rechnungposition-detail-dialog.component.scss']
})
export class RechnungpositionDetailDialogComponent implements OnInit {

  rechnungsnummer: string;

  constructor(public dialogRef: MatDialogRef<RechnungpositionDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: IRechnungpositionDetailDialogData) {
    this.rechnungsnummer = data.Rechnungsnummer;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
