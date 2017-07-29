import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private router: Router
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
          this.router.navigate(['/profile']); 
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
