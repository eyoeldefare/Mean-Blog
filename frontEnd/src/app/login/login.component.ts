import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../authGuard/login.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  previousUrl: String
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private router: Router,
    private loginGuard: AuthGuard
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onLoginSubmit() {
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl])
          }
          else {
            this.router.navigate(['']);
          }
        }, 2000);
      }
    });
  }

  ngOnInit() {

    if (this.loginGuard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "Please login!"
      this.previousUrl = this.loginGuard.redirectUrl;
      this.loginGuard.redirectUrl = undefined
    }
  }

}
