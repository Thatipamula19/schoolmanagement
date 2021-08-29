import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';
import { Result } from '../models/result.model';
import { ResultService } from '../services/result.service';

@Component({
  selector: 'app-seeresult',
  templateUrl: './seeresult.component.html',
  styleUrls: ['./seeresult.component.css']
})
export class SeeresultComponent implements OnInit, OnDestroy {

  results: Result[] = [];
  result: any[];
  total: number;
  precentage: number;
  nbrresult: number = 0;
  private resultSubs: Subscription;
  adiminId: string;


  resultForm: FormGroup;
  constructor(private resultService: ResultService, private adiminService: AdiminLoginService) { }

  ngOnInit() {

    this.adiminId = this.adiminService.getadiminId();

    this.resultForm = new FormGroup({
      studentid: new FormControl(null, Validators.required)
    })
    this.resultService.getResults();
    this.resultSubs = this.resultService.getResultUpadateListener()
      .subscribe((results: Result[]) => {
        console.log(results)
        this.results = results;
      })

  }

  seeResult(form) {
    if (this.resultForm.invalid) {
      return;
    };
    this.resultService.getResult(this.resultForm.value.studentid)
      .subscribe(result => {
        console.log(result);

        this.result = [result];

        this.nbrresult = ([result] as any[]).length;



        this.total = result.telugu + result.hindi + result.english + result.maths + result.science + result.social;
        this.precentage = this.total / 6;

      })
  }
  deleteResult(studentid) {
    this.resultService.deleteResult(studentid);
  }
  ngOnDestroy() {
    this.resultSubs.unsubscribe();
  }

}
