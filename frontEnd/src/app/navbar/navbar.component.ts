import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { BlogService } from "../service/blog.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  title;
  constructor(private as: AuthenticateService, private router: Router, private bs: BlogService) { }

  ngOnInit() {
  }

  searchSubmit(title){
    this.bs.addSearch(title);
  }



  onLogoutClick() {
    this.as.logout();
    this.router.navigate([''])
  }


}
