import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessLogicService } from '../business-logic/business-logic.service';

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

  RechnungsUID: string;

  Rechnungsnummer: string;

  constructor(
    private businessLogicService: BusinessLogicService,
    public dialogRef: MatDialogRef<RechnungpositionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: IRechnungpositionDetailDialogData) {
    this.RechnungsUID = data['Rechnungs-UID'];
    this.Rechnungsnummer = data.Rechnungsnummer;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
