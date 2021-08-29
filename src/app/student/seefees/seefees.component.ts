import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';
import { Fees } from '../models/fees.model';
import { FeesService } from '../services/fees.service';

@Component({
  selector: 'app-seefees',
  templateUrl: './seefees.component.html',
  styleUrls: ['./seefees.component.css']
})
export class SeefeesComponent implements OnInit, OnDestroy {

  feesForm: FormGroup;
  feeses: Fees[] = [];
  fees: any[];
  feesSubs: Subscription;
  feebalance: number;
  adiminId: string;

  constructor(private feesService: FeesService, private adiminService: AdiminLoginService) { }

  ngOnInit() {

    this.adiminId = this.adiminService.getadiminId();
    this.feesForm = new FormGroup({
      studentid: new FormControl(null, Validators.required)
    });


    this.feesSubs = this.feesService.getFeesUpdateListener()
      .subscribe((feeses: Fees[]) => {
        this.feeses = feeses;
      })

  }

  Search(feesForm) {
    if (this.feesForm.invalid) {
      return;
    }
    this.feesService.getFees(this.feesForm.value.studentid)
      .subscribe(feees => {
        this.fees = [feees];
        this.feebalance = feees.totalamount - feees.paidamount;
      })

    this.feesForm.reset();
  }

  deleteFees(studentid) {
    this.feesService.deleteFees(studentid);
  }


  ngOnDestroy() {
    this.feesSubs.unsubscribe();
  }
}
