import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdiminLoginComponent } from './adimin-login/adimin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule, MdbBreadcrumbComponent } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AdiminLoginComponent
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule, MDBBootstrapModule.forRoot(),
    FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  exports: [AdiminLoginComponent],
  entryComponents: [AdiminLoginComponent]

})
export class AdiminModule { }
