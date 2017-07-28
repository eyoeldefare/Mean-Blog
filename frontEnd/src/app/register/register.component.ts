import { Component, OnInit } from '@angular/core';
import {FormBuilder, AbstractControl,FormGroup, Validators} from '@angular/forms';

  function matchingPasswords(c: AbstractControl) {
    return (c.get('password').value === c.get('password1').value)? null : {'nomatch':true};
  }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  constructor(private fb: FormBuilder) {
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
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
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
    }, { validator: matchingPasswords}); 
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
    console.log('form submitted');
  }

  ngOnInit() {
  }

}
