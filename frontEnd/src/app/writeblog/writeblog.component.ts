import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-writeblog',
  templateUrl: './writeblog.component.html',
  styleUrls: ['./writeblog.component.css']
})
export class WriteblogComponent implements OnInit {
  id: any;
  blog;

  constructor(private bs: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEachblogs()
  }

  getEachblogs() {
    this.bs.getEachblogs(this.route.snapshot.params['id']).subscribe(data => {
      this.blog = data.blog;
      console.log(this.blog.googledoc);
    });
  }



}























