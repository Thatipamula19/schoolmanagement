import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employeeLogin: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.employeeLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  Login(employeeLogin) {
    if (this.employeeLogin.invalid) {
      return;
    }
    this.loginService.login(this.employeeLogin.value.username, this.employeeLogin.value.password);
    console.log(employeeLogin)
  }
}
