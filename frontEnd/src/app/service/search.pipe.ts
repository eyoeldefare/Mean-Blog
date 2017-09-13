import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(blogs: any, result: any): any {
    if (!result || !blogs){
      return;
    }
    return blogs.filter(function(blog){
      return blog.summery.toLowerCase().includes(result.toLowerCase()) || blog.title.toLowerCase().includes(result.toLowerCase());
    })
  }

}
