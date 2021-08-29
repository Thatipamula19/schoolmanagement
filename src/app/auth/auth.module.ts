import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentLoginComponent } from './student-login/student-login.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AdiminModule } from '../adimin/adimin.module';
import { EmployeeInterceptor } from './interceptors/employee.interceptor';
import { StudentInterceptor } from './interceptors/student.interceptor';
import { AdiminInterceptor } from './interceptors/adimin.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
    StudentLoginComponent,
    LoginpageComponent,

  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule, MDBBootstrapModule.forRoot(),
    HttpClientModule, FormsModule, ReactiveFormsModule, AdiminModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: EmployeeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: StudentInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AdiminInterceptor, multi: true },]
})
export class AuthModule { }
