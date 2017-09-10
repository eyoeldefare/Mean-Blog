import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(blogs: any, tags: String): any {
    if (tags === "all") {
      return blogs
    }
    else {
      return blogs.filter(blog => {
        return blog.tags === tags;
      })
    }
  }

}
