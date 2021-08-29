import { Component, OnInit } from '@angular/core';
import { StudentLoginService } from 'src/app/auth/student-login.service';
import { FeesService } from 'src/app/student/services/fees.service';

@Component({
  selector: 'app-studentfees',
  templateUrl: './studentfees.component.html',
  styleUrls: ['./studentfees.component.css']
})
export class StudentfeesComponent implements OnInit {
  isLoading = false;
  studentId: string;
  studentFees: any[];
  feebalance: number;

  constructor(private studentService: StudentLoginService, private feesService: FeesService) { }

  ngOnInit() {

    this.studentId = this.studentService.getStudentId();
    this.isLoading = true;
    this.feesService.getFees(this.studentId)
      .subscribe(fees => {
        this.isLoading = false;
        this.studentFees = [fees];
        this.feebalance = fees.totalamount - fees.paidamount;
      })
  }

}
