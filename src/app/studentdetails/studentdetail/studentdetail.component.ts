import { Component, OnInit } from '@angular/core';
import { StudentLoginService } from 'src/app/auth/student-login.service';
import { StudentadimisionService } from 'src/app/student/services/studentadimision.service';

@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  isLoading = false;
  studentdetail: any[];
  studentId: string;

  constructor(private studentService: StudentLoginService, private adimisionService: StudentadimisionService) { }

  ngOnInit() {

    this.studentId = this.studentService.getStudentId();
    this.isLoading = true;
    this.adimisionService.getAdimision(this.studentId)
      .subscribe(student => {
        this.isLoading = false;
        console.log(student);
        this.studentdetail = [student];
      })
  }

}
