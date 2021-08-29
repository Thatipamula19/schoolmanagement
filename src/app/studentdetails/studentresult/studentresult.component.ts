import { Component, OnInit } from '@angular/core';
import { StudentLoginService } from 'src/app/auth/student-login.service';
import { ResultService } from 'src/app/student/services/result.service';

@Component({
  selector: 'app-studentresult',
  templateUrl: './studentresult.component.html',
  styleUrls: ['./studentresult.component.css']
})
export class StudentresultComponent implements OnInit {

  isLoading = false;
  studentId: string;
  studentResult: any[];
  total: number;
  precentage: number;

  constructor(private studentService: StudentLoginService, private resultService: ResultService) { }

  ngOnInit() {

    this.studentId = this.studentService.getStudentId();
    this.isLoading = true;
    this.resultService.getResult(this.studentId)
      .subscribe(result => {
        this.isLoading = false;
        console.log(result);
        this.studentResult = [result];
        this.total = result.telugu + result.hindi + result.english + result.maths + result.science + result.social;
        this.precentage = this.total / 6;
      })
  }

}
