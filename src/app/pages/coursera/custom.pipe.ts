import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe',
})
export class CustompipePipe implements PipeTransform {
  transform(value: string, type: 'lower' | 'upper'): string {
    if (type === 'lower') {
      value = value.toLowerCase();
    } else {
      value = value.toUpperCase();
    }
    return value;
  }
}
