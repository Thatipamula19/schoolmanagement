import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentLoginService } from '../student-login.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  studentLogin: FormGroup;

  constructor(private studentService: StudentLoginService) { }


  ngOnInit() {
    this.studentLogin = new FormGroup({
      studentid: new FormControl(null, Validators.required),
      stddob: new FormControl(null, Validators.required)
    });
  }
  Login(studentLogin) {
    if (this.studentLogin.invalid) {
      return;
    }
    this.studentService.login(this.studentLogin.value.studentid, this.studentLogin.value.stddob);
    console.log(studentLogin)
  }

}
