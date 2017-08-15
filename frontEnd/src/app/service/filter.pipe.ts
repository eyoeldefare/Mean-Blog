import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    // if (args ==="all"){
    //   return items
    // }
    // else{
    //   return items.tags ===args;
    // }
  }

}
