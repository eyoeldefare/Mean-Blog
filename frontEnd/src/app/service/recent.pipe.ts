import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recent',
  pure: false
})
export class RecentPipe implements PipeTransform {

  transform(blogs: Array<any>): any {
    if (blogs){
      return blogs.reverse()
    }

    // if (blogs) {
    //   let index0 = args[0];
    //   blogs.sort((first: any, second: any) => {

    //     if (first[index0] < second[index0]) {
    //       return -1
    //     }
    //     else{
    //       if (first[index0] > second[index0]){
    //         return 1;

    //       }
    //       else{
    //         return 0;
    //       }
    //     }
    //   });
    //   return blogs;
    // }
 
  }

}
