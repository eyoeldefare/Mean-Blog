import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable()
export class EmailService {
  domain = "http://localhost:3000";
  constructor(private http:Http) { }
  
  getEmail(user){
    return this.http.post( this.domain + '/email/reg', user).map(res => res.json())
  }

}
