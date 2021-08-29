import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdiminLoginService } from '../adimin-login.service';

@Component({
  selector: 'app-adimin-login',
  templateUrl: './adimin-login.component.html',
  styleUrls: ['./adimin-login.component.css']
})
export class AdiminLoginComponent implements OnInit {

  adiminLogin: FormGroup;

  constructor(private adiminService: AdiminLoginService) { }

  ngOnInit() {
    this.adiminLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  Login(adiminLogin) {
    if (this.adiminLogin.invalid) {
      return;
    }
    this.adiminService.adiminLogin(this.adiminLogin.value.username, this.adiminLogin.value.password);

  }

}
