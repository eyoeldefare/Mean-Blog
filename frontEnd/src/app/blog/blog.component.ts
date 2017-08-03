import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from "../service/blog.service";
import { AuthenticateService } from '../service/authenticate.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  form;
  username;
  something;
  message;
  messageClass;
  constructor(private fb: FormBuilder, private blogservice: BlogService, private auth: AuthenticateService) {
    this.blogForm()
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

      googledoc: ['', Validators.compose([
        Validators.required,
      ])]
    })
  }
  submitBlog() {
    const blog = {
      title: this.form.get("title").value,
      tags: this.form.get("tags").value,
      summery: this.form.get("summery").value,
      googledoc: this.form.get("googledoc").value,
      createdBy: this.username,

    }
    this.blogservice.createBlog(blog).subscribe(data => {
      if (!data.success) {
        this.message = data.message
        this.messageClass = "alert alert-danger"
            console.log("blog failed")

      }
      else {
        this.message = data.message;
        this.messageClass = "alert alert-success"
            console.log("blog submited")


      }
    })

  }

  newBlogForm() {
    this.auth.getProfile().subscribe(profile => {
      this.username = profile.user.username
    })

  }

}
