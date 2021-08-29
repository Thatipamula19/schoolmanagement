import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdimisionComponent } from './adimision/adimision.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { AddresultComponent } from './addresult/addresult.component';
import { SeeresultComponent } from './seeresult/seeresult.component';
import { AddfeesComponent } from './addfees/addfees.component';
import { SeefeesComponent } from './seefees/seefees.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [

    AdimisionComponent,
    StudentdetailsComponent,
    AddresultComponent,
    SeeresultComponent,
    AddfeesComponent,
    SeefeesComponent
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule, MDBBootstrapModule.forRoot(),
    FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule
  ],
  exports: [AdimisionComponent]
})
export class StudentModule { }
