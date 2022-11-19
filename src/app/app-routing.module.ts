import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdiminGuard } from './auth/authguard/adimin.guard';
import { EmployeeGuard } from './auth/authguard/employee.guard';
import { StudentGuard } from './auth/authguard/student.guard';
import { LoginService } from './auth/login.service';
import { LoginpageComponent } from './auth/loginpage/loginpage.component';
import { HomeComponent } from './common/home/home.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { AddfeesComponent } from './student/addfees/addfees.component';
import { AddresultComponent } from './student/addresult/addresult.component';
import { AdimisionComponent } from './student/adimision/adimision.component';
import { SeefeesComponent } from './student/seefees/seefees.component';
import { SeeresultComponent } from './student/seeresult/seeresult.component';
import { StudentdetailsComponent } from './student/studentdetails/studentdetails.component';
import { StudentdetailComponent } from './studentdetails/studentdetail/studentdetail.component';
import { StudentfeesComponent } from './studentdetails/studentfees/studentfees.component';
import { StudentresultComponent } from './studentdetails/studentresult/studentresult.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adimision', component: AdimisionComponent, canActivate: [AdiminGuard] },
  { path: 'editadimision/:id', component: AdimisionComponent, canActivate: [AdiminGuard] },
  { path: 'stddetails', component: StudentdetailsComponent, canActivate: [AdiminGuard] },
  { path: 'stddetails/:id', component: StudentdetailsComponent, canActivate: [AdiminGuard] },
  { path: 'addresult', component: AddresultComponent, canActivate: [AdiminGuard] },
  { path: 'editresult/:id', component: AddresultComponent, canActivate: [AdiminGuard] },
  { path: 'seeresult', component: SeeresultComponent, canActivate: [AdiminGuard] },
  { path: 'seeresult/:id', component: SeeresultComponent, canActivate: [AdiminGuard] },
  { path: 'addfees', component: AddfeesComponent, canActivate: [AdiminGuard] },
  { path: 'editfees/:id', component: AddfeesComponent, canActivate: [AdiminGuard] },
  { path: 'seefees', component: SeefeesComponent, canActivate: [AdiminGuard] },
  { path: 'seefees/:id', component: SeefeesComponent, canActivate: [AdiminGuard] },
  { path: 'addemployee', component: EmployeeComponent, canActivate: [AdiminGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'adiminlogin', component: AdiminLoginComponent },
  // { path: 'studentlogin', component: StudentLoginComponent },
  //Student Pages
  { path: 'studentdetail', component: StudentdetailComponent, canActivate: [StudentGuard] },
  { path: 'studentresult', component: StudentresultComponent, canActivate: [StudentGuard] },
  { path: 'studentfees', component: StudentfeesComponent, canActivate: [StudentGuard] },
  { path: 'loginpage', component: LoginpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdiminGuard, StudentGuard]
})
export class AppRoutingModule { }
