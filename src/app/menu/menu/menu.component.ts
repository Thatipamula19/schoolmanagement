import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';
import { LoginService } from 'src/app/auth/login.service';
import { StudentLoginService } from 'src/app/auth/student-login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  employeeId: string;
  studentId: string;
  adiminId: string;
  employeeLogin = false;
  studentLogin = false;
  adiminLogin = false;
  employeeStatusSubs: Subscription;
  studentStatusSubs: Subscription;
  adiminStatusSubs: Subscription;
  constructor(private loginService: LoginService, private studentService: StudentLoginService,
    private adiminService: AdiminLoginService) { }

  ngOnInit() {

    this.employeeId = this.loginService.getemployeeId();
    this.studentId = this.studentService.getStudentId();
    this.adiminId = this.adiminService.getadiminId();


    this.employeeStatusSubs = this.loginService.getEmployeeStatusListner()
      .subscribe(employeeLogin => {
        this.employeeLogin = employeeLogin;
        this.employeeId = this.loginService.getemployeeId();
      });

    this.studentStatusSubs = this.studentService.getStudentStatusListner()
      .subscribe(studentLogin => {
        this.studentLogin = studentLogin;
        this.studentId = this.studentService.getStudentId();
      });
    this.adiminStatusSubs = this.adiminService.getAdiminStatusListner()
      .subscribe(adiminLogin => {
        this.adiminLogin = adiminLogin;
        this.adiminId = this.adiminService.getadiminId();
      })

  }

  employeelogout() {
    this.loginService.logout();
  }

  studentlogout() {
    this.studentService.logout();
  }
  adiminlogout() {
    this.adiminService.logout();
  }

  ngOnDestroy() {
    this.employeeStatusSubs.unsubscribe();
    this.studentStatusSubs.unsubscribe();
    this.adiminStatusSubs.unsubscribe();
  }

}
