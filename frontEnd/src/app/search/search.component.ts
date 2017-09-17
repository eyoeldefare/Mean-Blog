import { Component, OnInit, OnChanges } from '@angular/core';
import { BlogService } from "../service/blog.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  blogs: Array<String>;
  result: String;
  constructor(private bs: BlogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllblogs();
  }

  getAllblogs() {
    this.bs.getAllblogs().subscribe(data => {
      this.blogs = data.blogs;
    });
  }

  getSearch() {
    this.result = this.route.snapshot.params['title'];
    this.bs.searchSubject.subscribe(data => {
      this.result = data;
    });
    return this.result;
  }

}
