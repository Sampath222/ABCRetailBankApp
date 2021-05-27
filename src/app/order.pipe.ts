import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {
 
  transform(arr: any, val: string, dir: string): any[] {
    debugger;
    const sorteddata = arr.sort((a: any, b: any) => {
      if (a[val] > b[val]) {
        return 1;
      }
      else if (a[val] < b[val]) {
        return -1;
      }
      else {
        return 0;
      }
    });

    return (dir == "asc") ? sorteddata : sorteddata.reverse();
  }

}
