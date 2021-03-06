import { Component, OnInit, OnChanges } from '@angular/core';
import { BlogService } from "../service/blog.service";
import { ActivatedRoute } from "@angular/router";
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-writeblog',
  templateUrl: './writeblog.component.html',
  styleUrls: ['./writeblog.component.css']
})
export class WriteblogComponent implements OnInit, OnChanges {
  googledoc: any;
  title: String;
  createdBy: String;
  date: Date;
  form: FormGroup;
  blog_id: any;
  comments: String;
  message: String;
  messageClass: String;
  constructor(private bs: BlogService, private fb: FormBuilder, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.commentForm();
  }
  ngOnChanges() {

  }
  ngOnInit() {
    this.getEachblogs();
    this.getOnlyComment()

  }
  commentForm() {
    this.form = this.fb.group({
      comment: ["", Validators.maxLength(800)]
    })
  }
  submitComment(id) {
    const comment = this.form.get("comment").value;
    var time = (new Date()).toUTCString();
    this.bs.comments(id, comment, time).subscribe(data => {

      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.form.reset();
        setTimeout(() => {
          this.messageClass = '';
          this.message = '';
        }, 3000);
      }
      else {
        this.form.reset();
        this.getOnlyComment()
        setTimeout(() => {
          this.messageClass = '';
          this.message = '';
        }, 3000);

      }


    })
  }

  cancel(id) {
    this.form.reset();
  }

  getEachblogs() {
    this.bs.getEachblogs(this.route.snapshot.params['id']).subscribe(data => {
      this.googledoc = this.sanitizer.bypassSecurityTrustHtml(data.blog.googledoc);
      this.createdBy = data.blog.createdBy;
      this.date = data.blog.createdAt;
      this.title = data.blog.title;
      this.blog_id = data.blog._id;
    });
  }
  getOnlyComment() {
    this.bs.getEachblogs(this.route.snapshot.params['id']).subscribe(data => {
      this.comments = data.blog.comments;
    });
  }

}























