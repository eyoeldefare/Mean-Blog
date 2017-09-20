import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(blogs: any, result: String): any {


    if (!blogs || !result || result === "") {
      return;
    }
    return blogs.filter(function (blog) {
      return blog.summery.toLowerCase().includes(result.toLowerCase()) || blog.title.toLowerCase().includes(result.toLowerCase()) || 
      blog.tags.toLowerCase().includes(result.toLowerCase()) || blog.googledoc.toLowerCase().includes(result.toLowerCase());

    })
  }

}
