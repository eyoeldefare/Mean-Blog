import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";
import { ActivatedRoute } from "@angular/router";
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-writeblog',
  templateUrl: './writeblog.component.html',
  styleUrls: ['./writeblog.component.css']
})
export class WriteblogComponent implements OnInit {
  id: any;
  googledoc: any;
  title: String;
  createdBy: String;
  date;
  form;
  blog_id;
  newComment = [];

  constructor(private bs: BlogService, private fb: FormBuilder, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.commentForm();
  }

  ngOnInit() {
    this.getEachblogs()

  }
  commentForm() {
    this.form = this.fb.group({
      comment: ["", Validators.maxLength(800)]
    })
  }
  submitComment(id) {
    const comment = this.form.get("comment").value;
    this.bs.comments(id,comment).subscribe(data =>{
      this.newComment = data;
      console.log([id, comment])
      
    })
  }

  cancel(id) {
    // const index = this.newComment.indexOf(id);
    // this.newComment.slice(index, 1);
    this.form.reset();
  }

  getEachblogs() {
    this.bs.getEachblogs(this.route.snapshot.params['id']).subscribe(data => {
      this.googledoc = this.sanitizer.bypassSecurityTrustHtml(data.blog.googledoc);
      this.createdBy = data.blog.createdBy;
      this.date = data.blog.createdAt;
      this.title = data.blog.title;
      this.blog_id=data.blog._id;
      console.log(this.blog_id)
    });
  }
}























