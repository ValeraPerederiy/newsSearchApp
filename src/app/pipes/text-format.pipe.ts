import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat'
})
export class TextFormatPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (value.length < 100) {
      return value 
    } else {
      return value.substring(0,100) + ' ...'
    }

  }

}
