import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticateService {

  domain = "http://localhost:3000";

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }



}