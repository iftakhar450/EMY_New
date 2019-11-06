import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any, text?: any): any {
    console.log(text);
    if (list && text !== undefined && text !== '') {
      const res = list.filter((obj: any) => obj.name.toLowerCase().includes(text.toLowerCase()));
        return res;
    } else {
      return list;
    }
  }
}
