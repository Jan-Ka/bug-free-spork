import { BusinessLogicModule } from '../business-logic.module';
import { Injectable } from '@angular/core';
import demoData from './bug-free-spork_demo.json';

@Injectable({
  providedIn: BusinessLogicModule
})
export class DemoDataService {

  constructor() { }

  getRechnung() {
    return demoData.updatedRechnungArray;
  }

  getRechnungsposition() {
    return demoData.rechnungspositionArray;
  }

  getLieferstatus() {
    return demoData.lieferstatusArray;
  }
}
