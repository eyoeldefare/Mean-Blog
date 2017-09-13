import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";
@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  blogs:Array<String>;
  constructor(private bs:BlogService) { }

  ngOnInit() {
    this.getAllblogs()
  }
  getAllblogs() {
    this.bs.getAllblogs().subscribe(data => {
      this.blogs = data.blogs;
    });
  }

}
