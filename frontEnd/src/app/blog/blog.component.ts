import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from "../service/blog.service";
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  form;
  message;
  username;
  messageClass;
  constructor(private fb: FormBuilder, private route: Router, private blogservice: BlogService, private auth: AuthenticateService) {
    this.blogForm();
  }

  ngOnInit() {
  }

  blogForm() {
    this.form = this.fb.group({

      title: ['', Validators.compose([
        Validators.required,
        
      ])],

      tags: ['', Validators.required],

      summery: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(150),
      ])],
      thumbnail: ['', Validators.required],

      googledoc: ['', Validators.compose([
        Validators.required,
      ])]
    })
  }

  submitBlog() {
    this.auth.loadUser();
    this.username = JSON.parse(this.auth.user);
    this.username = this.username.username;
    const blog = {
      title:this.form.get("title").value,
      tags: this.form.get("tags").value,
      summery: this.form.get("summery").value,
      thumbnail: this.form.get("thumbnail").value,
      googledoc: this.form.get("googledoc").value,
      createdBy: this.username

    }

    this.blogservice.createBlog(blog).subscribe(data => {
      if (!data.success) {
        this.message = data.message
        this.messageClass = "alert alert-danger"

      }
      else {
        this.message = data.message;
        this.messageClass = "alert alert-success"
        setTimeout(() => {
          this.route.navigate(['']);
        }, 2000);


      }
    })

  }



}
