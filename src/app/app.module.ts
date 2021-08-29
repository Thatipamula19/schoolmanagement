import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdiminModule } from './adimin/adimin.module';
import { CommonModule } from '@angular/common';
import { EmployeeModule } from './employee/employee.module';
import { MenuModule } from './menu/menu.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { CommaonModule } from './common/common.module';
import { StudentdetailsModule } from './studentdetails/studentdetails.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeInterceptor } from './auth/interceptors/employee.interceptor';
import { StudentInterceptor } from './auth/interceptors/student.interceptor';
import { ErrorInterceptor } from './common/error.interceptor';
import { AdiminInterceptor } from './auth/interceptors/adimin.interceptor';
import { StudentGuard } from './auth/authguard/student.guard';
import { AdiminGuard } from './auth/authguard/adimin.guard';
import { EmployeeGuard } from './auth/authguard/employee.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule,
    AppRoutingModule, MaterialModule, MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    //Modules
    AdiminModule, AuthModule, CommaonModule, EmployeeModule, MenuModule, StudentModule,
    StudentdetailsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: EmployeeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: StudentInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AdiminInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, StudentGuard, AdiminGuard, EmployeeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
