import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Adimision } from '../models/adimision.model';
import { StudentadimisionService } from '../services/studentadimision.service';

@Component({
  selector: 'app-adimision',
  templateUrl: './adimision.component.html',
  styleUrls: ['./adimision.component.css']
})
export class AdimisionComponent implements OnInit {

  adimisionform: FormGroup;
  adimisionid: string;


  private studentid: string;
  isLoading = false;
  mode = 'create';

  classes: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  gender: string[] = ['Male', 'Female'];
  constructor(private adimisionService: StudentadimisionService, private activeRouter: ActivatedRoute) { }

  ngOnInit() {

    this.adimisionform = new FormGroup({
      studentid: new FormControl(null),
      stdname: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdfathername: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdgender: new FormControl(null, { validators: [Validators.required] }),
      stddob: new FormControl(null, { validators: [Validators.required] }),
      stdmobile: new FormControl(null, { validators: [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] }),
      stdemail: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] }),
      stdclass: new FormControl(null, { validators: [Validators.required] }),
      stdaddress: new FormControl(null, { validators: [Validators.required] })
    })

    this.studentid = this.activeRouter.snapshot.params['id'];

    if (this.studentid) {
      this.mode = 'edit';
      this.isLoading = true;
      this.adimisionService.getAdimision(this.studentid).subscribe(adimision => {
        this.isLoading = false;
        this.adimisionid = adimision._id;
        // this.adimision = {
        //   studentid: adimision.studentid,
        //   stdname: adimision.stdname,
        //   // stdfathername: adimision.stdfathername,
        //   // stdgender: adimision.stdgender,
        //   // stddob: adimision.stddob,
        //   // stdmobile: adimision.stdmobile,
        //   // stdemail: adimision.stdemail,
        //   // stdclass: adimision.stdclass,
        //   // stdaddress: adimision.stdaddress

        // }
        this.adimisionform.setValue({
          studentid: adimision.studentid,
          stdname: adimision.stdname,
          stdfathername: adimision.stdfathername,
          stdgender: adimision.stdgender,
          stddob: adimision.stddob,
          stdmobile: adimision.stdmobile,
          stdemail: adimision.stdemail,
          stdclass: adimision.stdclass,
          stdaddress: adimision.stdaddress
        })
      })
    }
    else {
      this.mode = 'create';
    }



  }

  newAdimison(form) {
    if (this.adimisionform.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.adimisionService.newAdimision(
        this.adimisionform.value.studentid,
        this.adimisionform.value.stdname,
        this.adimisionform.value.stdfathername,
        this.adimisionform.value.stdgender,
        this.adimisionform.value.stddob,
        this.adimisionform.value.stdmobile,
        this.adimisionform.value.stdemail,
        this.adimisionform.value.stdclass,
        this.adimisionform.value.stdaddress
      )
    }
    else {
      this.adimisionService.updateAdimision(
        this.adimisionid,
        this.adimisionform.value.studentid,
        this.adimisionform.value.stdname,
        this.adimisionform.value.stdfathername,
        this.adimisionform.value.stdgender,
        this.adimisionform.value.stddob,
        this.adimisionform.value.stdmobile,
        this.adimisionform.value.stdemail,
        this.adimisionform.value.stdclass,
        this.adimisionform.value.stdaddress
      )
    }
    this.adimisionform.reset();
  }


}
