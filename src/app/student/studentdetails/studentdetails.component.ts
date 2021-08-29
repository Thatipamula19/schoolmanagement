import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';
import { Adimision } from '../models/adimision.model';
import { StudentadimisionService } from '../services/studentadimision.service';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit, OnDestroy {
  classes: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  adimisions: Adimision[] = [];

  adimision: any[];

  isLoading = false;
  adimisioncount: number;
  adiminId: string;
  detailForm: FormGroup;


  private adimisionsSubs: Subscription;
  constructor(private adimisionService: StudentadimisionService, private adiminService: AdiminLoginService) { }

  ngOnInit() {

    this.adiminId = this.adiminService.getadiminId();

    this.detailForm = new FormGroup({
      studentid: new FormControl(null, Validators.required)
    })
    this.adimisionService.getAdimisions();
    this.adimisionsSubs = this.adimisionService.getAdimisionUpdateListener()
      .subscribe((adimisions: Adimision[]) => {
        this.adimisions = adimisions;
      });


  }


  // studentsByClass(stdclass) {
  //   return this.adimisions.filter(product => product.stdclass === stdclass);
  // }


  Search(form) {
    if (this.detailForm.invalid) {
      return;

    }
    this.isLoading = true;
    this.adimisionService.getAdimision(this.detailForm.value.studentid).subscribe(

      adimision => {
        this.isLoading = false;
        this.adimision = [adimision];
        this.adimisioncount = (adimision as any).length;
      }
    )
    this.detailForm.reset();
  }

  deleteAdimision(studentid) {
    this.adimisionService.deleteAdimison(studentid);
  }

  ngOnDestroy() {
    this.adimisionsSubs.unsubscribe();
  }

}
