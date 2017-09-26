import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from "../service/authenticate.service";
import { Router } from '@angular/router';

function matchingPasswords(c: AbstractControl) {
  return (c.get('password').value === c.get('password1').value) ? null : { 'nomatch': true };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  form: FormGroup;
  message:String;
  messageClass:String;
  emailValid:Boolean;
  emailMessage:String;
  usernameValid:Boolean;
  usernameMessage:String;
  constructor(private fb: FormBuilder, private as: AuthenticateService, private router: Router) {
    this.createForm()
  }
  createForm() {
    this.form = this.fb.group({

      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],

      firstname: ['', Validators.required],

      lastname: ['', Validators.required],

      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],

      password1: ['', Validators.required]
    }, { validator: matchingPasswords });
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  } 

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,20}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }



  onRegister() {
    const user = {
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }

    this.as.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
  }

  checkEmail() {
    this.as.checkEmail(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = true;
        this.emailMessage = data.message;
      } else {
        this.emailValid = false;
        this.emailMessage = data.message;
      }
    });
  }
  checkUsername() {
    this.as.checkUsername(this.form.get('username').value).subscribe(data => {
      if (!data.success) {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }
    });
  }
  ngOnInit() {
  }

}
