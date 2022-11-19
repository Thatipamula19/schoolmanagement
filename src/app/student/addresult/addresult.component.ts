import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../services/result.service';
import { StudentadimisionService } from '../services/studentadimision.service';

@Component({
  selector: 'app-addresult',
  templateUrl: './addresult.component.html',
  styleUrls: ['./addresult.component.css']
})
export class AddresultComponent implements OnInit {

  classes: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  resultForm: FormGroup;

  private studentid: string;
  mode = 'create';
  resultid: string;
  isAdimision:boolean = true;

  constructor(private resultService: ResultService, private activeRouter: ActivatedRoute, private adimisionService: StudentadimisionService) { }

  ngOnInit() {
    this.resultForm = new FormGroup({
      studentid: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdname: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      stdclass: new FormControl(null, { validators: [Validators.required] }),
      telugu: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      hindi: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      english: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      maths: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      science: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      social: new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] })
    });

    this.studentid = this.activeRouter.snapshot.params['id'];

    if (this.studentid) {
      this.mode = 'edit';

      this.resultService.getResult(this.studentid).subscribe(resultData => {
        this.resultid = resultData._id;
        this.resultForm.setValue({
          studentid: resultData.studentid,
          stdname: resultData.stdname,
          stdclass: resultData.stdclass,
          telugu: resultData.telugu,
          hindi: resultData.hindi,
          english: resultData.english,
          maths: resultData.maths,
          science: resultData.science,
          social: resultData.social
        })
      })
    }
    else {
      this.mode = 'create';
    }


  }


  addResult(form) {
    if (this.resultForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.resultService.addResult(
        this.resultForm.value.studentid,
        this.resultForm.value.stdname,
        this.resultForm.value.stdclass,
        this.resultForm.value.telugu,
        this.resultForm.value.hindi,
        this.resultForm.value.english,
        this.resultForm.value.maths,
        this.resultForm.value.science,
        this.resultForm.value.social,
      )
    }
    else {
      console.log(this.resultid)
      this.resultService.updateResult(
        this.resultid,
        this.resultForm.value.studentid,
        this.resultForm.value.stdname,
        this.resultForm.value.stdclass,
        this.resultForm.value.telugu,
        this.resultForm.value.hindi,
        this.resultForm.value.english,
        this.resultForm.value.maths,
        this.resultForm.value.science,
        this.resultForm.value.social,
      )
    }
  }

  checkSutdent($event){
    this.adimisionService.checkDetails($event.target.value).subscribe((res:any)=>{
      console.log(res.message);
      if(res.message === "No Record Found"){
        this.isAdimision = false;
      } else{
        this.isAdimision = true;
        this.resultForm.get('stdname')?.setValue(res?.stdname);
        this.resultForm.get('stdclass')?.setValue(res?.stdclass);
      }
    })
  }


}
