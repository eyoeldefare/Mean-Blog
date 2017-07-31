import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private as: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }
  onLogoutClick() {
    this.as.logout();
    this.router.navigate([''])
  }
 

}
