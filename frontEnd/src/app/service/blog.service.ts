import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



import { AuthenticateService } from './authenticate.service';

@Injectable()
export class BlogService {
  options;
  domain = this.auth.domain;
  constructor(private auth: AuthenticateService, private http: Http) {
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

    return this.http.get(this.domain + '/blogs/blogthumbnails/blog'+id).map(res => res.json());

  }
  comments(id, comment){
    const commentAndid = {
      id:id, 
      comment:comment
    }
        return this.http.post(this.domain + '/blogs/blogthumbnails/comment', commentAndid).map(res => res.json());
  }

}