import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AdiminGuard implements CanActivate {
  constructor(private adiminService: AdiminLoginService, private employeeSeevice: LoginService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAdimin = this.adiminService.getadiminId();
    const isEmployee = this.employeeSeevice.getemployeeId();
    console.log(isAdimin);
    if (isAdimin) {
      return true;
    } else if (isEmployee) {
      return true;
    } else {
      this.router.navigate(["/loginpage"]);
      return false;
    }


  }

}
