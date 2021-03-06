import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";


import { AuthenticateService } from './authenticate.service';

@Injectable()
export class BlogService {
  options;
  domain = this.auth.domain;
  public searchSubject = new Subject<any>();

  constructor(private router: Router, private auth: AuthenticateService, private http: Http) {
  }

  createAuthenticationHeaders() {
    this.auth.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.auth.authToken
      })
    });
  }


  createBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/blogs/thumbnail', blog, this.options).map(res => res.json())
  }
  getAllblogs() {

    return this.http.get(this.domain + '/blogs/blogthumbnails').map(res => res.json());

  }
  getEachblogs(id) {

    return this.http.get(this.domain + '/blogs/blogthumbnails/blog' + id).map(res => res.json());

  }
  comments(id, comment,time) {
    this.createAuthenticationHeaders();
    const commentAndid = {
      id: id,
      comment: comment,
      time:time
    }
    return this.http.put(this.domain + '/blogs/thumbnail', commentAndid, this.options).map(res => res.json());
  }

  addSearch(data){
    this.searchSubject.next(data);
  }
 

}