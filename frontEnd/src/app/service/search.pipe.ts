import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(blogs: any, result: any): any {
    if (!result || result===undefined || !blogs){
      return;
    }
    return blogs.filter(function(blog){
      return blog.title.toLowerCase().includes(result.toLowerCase());
    })
  }

}
