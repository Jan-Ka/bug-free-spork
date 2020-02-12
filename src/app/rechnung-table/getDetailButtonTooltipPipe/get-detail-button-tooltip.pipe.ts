import { Pipe, PipeTransform } from '@angular/core';
import { IRechnung } from 'shared/IRechnung';

@Pipe({
  name: 'getDetailButtonTooltip'
})
export class GetDetailButtonTooltipPipe implements PipeTransform {

  transform(rechnung: IRechnung): any {
    return `Opens a detail dialog for ${rechnung.Rechnungsnummer}`;
  }

}
