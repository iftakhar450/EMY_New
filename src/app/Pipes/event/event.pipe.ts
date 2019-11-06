import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value)
    if (value[0]) {
      return value[0].title;
    } else {
      return '';
    }

  }

}
