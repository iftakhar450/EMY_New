import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // moment().format('LT');   // 3:25 PM
    // moment().format('LTS');  // 3:25:11 PM
    // moment().format('L');    // 10/17/2019
    // moment().format('l');    // 10/17/2019
    // moment().format('LL');   // October 17, 2019
    // moment().format('ll');   // Oct 17, 2019
    // moment().format('LLL');  // October 17, 2019 3:25 PM
    // moment().format('lll');  // Oct 17, 2019 3:25 PM
    // moment().format('LLLL'); // Thursday, October 17, 2019 3:25 PM
    // moment().format('llll'); // Thu, Oct 17, 2019 3:25 PM
    return moment(value).format('LL');
  }

}
