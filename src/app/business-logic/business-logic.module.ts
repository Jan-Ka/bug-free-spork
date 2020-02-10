import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechnungService } from './rechnung.service';
import { BusinessLogicService } from './business-logic.service';
import { RechnungspositionService } from './rechnungsposition.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RechnungService,
    RechnungspositionService,

    BusinessLogicService
  ]
})
export class BusinessLogicModule { }
