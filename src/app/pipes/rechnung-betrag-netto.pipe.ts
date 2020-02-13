import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechnungBetragNetto'
})
export class RechnungBetragNettoPipe implements PipeTransform {

  transform(value: number): string {
    const numberString = Math.abs(value).toFixed(2).toString();
    const parts = numberString.split('.');

    // TODO: there is probably a pure regex solution for this that I'm just failing to see
    // add digit grouping / thousands separator
    const integerPart = parts[0]
      .split('') // string to letter array
      .reduce((agg, cur) => cur + agg, '') // reverse and join letter array
      .match(/.{1,3}/g) // split into groups of up to 3 digits
      .map(val => val
        .split('')
        .reduce((agg, cur) => cur + agg, '')) // reconstruct original number order
      .reverse()
      .join('.');

    const fractionalPart = parts[1];

    return `${integerPart},${fractionalPart} €`;
  }

}
