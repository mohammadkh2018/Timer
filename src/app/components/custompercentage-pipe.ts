import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompercentage'
})
export class CustompercentagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
