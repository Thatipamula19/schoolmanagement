import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  gender: string[] = ['Male', 'Female'];

  employeeForm: FormGroup;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    this.employeeForm = new FormGroup({
      username: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      fullname: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      gender: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] }),
      mobile: new FormControl(null, { validators: [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] }),
      address: new FormControl(null, { validators: [Validators.required] }),
    })
    this.employeeService.getEmployees();
    this.employeeService.getEmployeeUpdateListener()
      .subscribe(employees => {
        console.log(employees)
      })
  }

  addEmployee(employeeForm) {
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeService.addEmployee(
      this.employeeForm.value.username,
      this.employeeForm.value.password,
      this.employeeForm.value.fullname,
      this.employeeForm.value.gender,
      this.employeeForm.value.email,
      this.employeeForm.value.mobile,
      this.employeeForm.value.address,
    );
    console.log(employeeForm);
  }


}
