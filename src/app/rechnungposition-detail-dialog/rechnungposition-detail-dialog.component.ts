import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rechnungposition-detail-dialog',
  templateUrl: './rechnungposition-detail-dialog.component.html',
  styleUrls: ['./rechnungposition-detail-dialog.component.scss']
})
export class RechnungpositionDetailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RechnungpositionDetailDialogComponent>) { }

  ngOnInit() {
  }

}
