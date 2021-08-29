import { Component, OnInit } from '@angular/core';
import { AdiminLoginService } from './adimin/adimin-login.service';
import { LoginService } from './auth/login.service';
import { StudentLoginService } from './auth/student-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'school';

  constructor(private studentService: StudentLoginService, private employeeLoginService: LoginService,
    private adiminService: AdiminLoginService) { }

  ngOnInit() {
    this.studentService.autoStudent();
    this.employeeLoginService.autoEmployee();
    this.adiminService.autoAdimin();

  }
}
