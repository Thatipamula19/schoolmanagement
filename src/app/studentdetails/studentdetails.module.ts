import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { StudentfeesComponent } from './studentfees/studentfees.component';
import { StudentresultComponent } from './studentresult/studentresult.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    StudentdetailComponent,
    StudentfeesComponent,
    StudentresultComponent
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule, MDBBootstrapModule.forRoot(),

  ]
})
export class StudentdetailsModule { }
