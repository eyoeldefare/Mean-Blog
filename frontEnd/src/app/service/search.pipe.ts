import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(blogs: any, result: String): any {
    const message: Array<any> = [{ title: "Sorry couldn't find it", thumbnail: "http://serps-invaders.com/wp-content/uploads/2014/04/broken-links.jpg" }];

    if (!result || result === "undefined") {
      return;
    }
    if (!blogs) {
      return;
    }
    return blogs.filter(function (blog) {
      if (blog) {
        if (blog.summery.toLowerCase().includes(result.toLowerCase()) === true || blog.title.toLowerCase().includes(result.toLowerCase()) === true) {
          return blog.summery.toLowerCase().includes(result.toLowerCase()) || blog.title.toLowerCase().includes(result.toLowerCase());
        }
        if (blog.summery.toLowerCase().includes(result.toLowerCase()) === false || blog.title.toLowerCase().includes(result.toLowerCase()) === true) {
          return false
        }
        if (blog.summery.toLowerCase().includes(result.toLowerCase()) === true || blog.title.toLowerCase().includes(result.toLowerCase()) === false) {
          return false
        }
        if (blog.summery.toLowerCase().includes(result.toLowerCase()) === false || blog.title.toLowerCase().includes(result.toLowerCase()) === false) {
          return false
        }
        else{
          return false
        }
      }


    })
  }

}
