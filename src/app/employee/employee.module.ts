import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule, MDBBootstrapModule.forRoot(),
    FormsModule, ReactiveFormsModule, HttpClientModule
  ]
})
export class EmployeeModule { }
