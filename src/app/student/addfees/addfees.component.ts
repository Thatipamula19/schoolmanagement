import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeesService } from '../services/fees.service';
import { StudentadimisionService } from '../services/studentadimision.service';

@Component({
  selector: 'app-addfees',
  templateUrl: './addfees.component.html',
  styleUrls: ['./addfees.component.css']
})
export class AddfeesComponent implements OnInit {
  classes: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  feeterms: string[] = ['Partial Payment', 'Full Payment', 'Monthly', 'Annual'];
  paymentmode: string[] = ['Cash', 'Card', 'Cheque'];

  feesForm: FormGroup;
  studentid: string;
  feesid: string;
  mode = 'create';
  isLoading = false;
  isAdimision:boolean = true;

  constructor(private feesService: FeesService, private activeRouter: ActivatedRoute, private adimisionService: StudentadimisionService) { }

  ngOnInit() {
    this.feesForm = new FormGroup({
      studentid: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdname: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdfathername: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdclass: new FormControl(null, { validators: [Validators.required] }),
      stdmobile: new FormControl(null, { validators: [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] }),
      totalamount: new FormControl(null, { validators: [Validators.required] }),
      paidamount: new FormControl(null, { validators: [Validators.required] }),
      feeterm: new FormControl(null, { validators: [Validators.required] }),
      paymentmode: new FormControl(null, { validators: [Validators.required] }),
      paymentdate: new FormControl(null, { validators: [Validators.required] })
    });

    this.studentid = this.activeRouter.snapshot.params['id'];
    if (this.studentid) {
      this.mode = 'edit';
      this.feesService.getFees(this.studentid).subscribe(feesData => {
        this.isLoading = false;
        this.feesid = feesData._id;

        this.feesForm.setValue({
          studentid: feesData.studentid,
          stdname: feesData.stdname,
          stdfathername: feesData.stdfathername,
          stdclass: feesData.stdclass,
          stdmobile: feesData.stdmobile,
          totalamount: feesData.totalamount,
          paidamount: feesData.paidamount,
          feeterm: feesData.feeterm,
          paymentmode: feesData.paymentmode,
          paymentdate: feesData.paymentdate,
        })
      })
    }
    else {
      this.mode = 'create';
    }
  }

  addFees(feesForm) {
    if (this.feesForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.feesService.addFees(
        this.feesForm.value.studentid,
        this.feesForm.value.stdname,
        this.feesForm.value.stdfathername,
        this.feesForm.value.stdclass,
        this.feesForm.value.stdmobile,
        this.feesForm.value.totalamount,
        this.feesForm.value.paidamount,
        this.feesForm.value.feeterm,
        this.feesForm.value.paymentmode,
        this.feesForm.value.paymentdate
      )
    }
    else {
      this.feesService.updateFees(
        this.feesid,
        this.feesForm.value.studentid,
        this.feesForm.value.stdname,
        this.feesForm.value.stdfathername,
        this.feesForm.value.stdclass,
        this.feesForm.value.stdmobile,
        this.feesForm.value.totalamount,
        this.feesForm.value.paidamount,
        this.feesForm.value.feeterm,
        this.feesForm.value.paymentmode,
        this.feesForm.value.paymentdate
      )
    }
    this.feesForm.reset();
  }

  checkSutdent($event){
    this.adimisionService.checkDetails($event.target.value).subscribe((res:any)=>{
      console.log(res.message);
      if(res.message === "No Record Found"){
        this.isAdimision = false;
      } else{
        this.isAdimision = true;
        this.feesForm.get('stdname')?.setValue(res?.stdname);
        this.feesForm.get('stdfathername')?.setValue(res?.stdfathername);
        this.feesForm.get('stdclass')?.setValue(res?.stdclass);
        this.feesForm.get('stdmobile')?.setValue(res?.stdmobile);
      }
    })
  }

}
