import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";
@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  blogs: Array<String>;

  constructor(private bs: BlogService) {

  }

  ngOnInit() {
    this.getAllblogs()
  }
  getAllblogs() {
    this.bs.getAllblogs().subscribe(data => {
      this.blogs = data.blogs;
      console.log(this.blogs)
    });
  }
 


}
