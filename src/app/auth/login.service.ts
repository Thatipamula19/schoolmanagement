import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login/login.model';

const BackEndUrl = environment.apiUrl + "/employee/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;

  private token: string;
  private tokenTimer: any;
  private employeeId: any;
  private employeeStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getEmployeeStatusListner() {
    return this.employeeStatusListener;
  }

  getemployeeId() {
    return this.employeeId;
  }

  getIsEmployee() {
    return this.isAuthenticated;
  }





  login(username: string, password: string) {
    const login: Login = { username: username, password: password }
    console.log(login);
    this.http.post<{ token: string, expiresIn: number, employeeId: string, isAdimin: boolean }>(BackEndUrl, login)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expriesInDuration = response.expiresIn;
          console.log(response.expiresIn);
          this.setEmployeeTimer(expriesInDuration);
          this.isAuthenticated = true;
          this.employeeId = response.employeeId;
          this.employeeStatusListener.next(true);
          const now = new Date();
          const exprirationDate = new Date(now.getTime() + expriesInDuration * 1000);
          console.log(exprirationDate);
          this.saveEmployeeData(token, exprirationDate, this.employeeId);
          this.router.navigate(["/"]);
        }


      }, error => {
        this.employeeStatusListener.next(false);
      })
  }



  autoEmployee() {
    const employeeInformation = this.getEmployeeData();

    if (!employeeInformation) {
      return;
    }

    const now = new Date();
    const expriesIn = employeeInformation.exprirationDate.getTime()
      - now.getTime();
    this.token = employeeInformation.token;
    this.isAuthenticated = true;
    this.employeeId = employeeInformation.employeeId;
    this.setEmployeeTimer(expriesIn / 1000);
    this.employeeStatusListener.next(true);

  }
  logout() {
    this.token = 'null';
    this.employeeId = null;
    this.isAuthenticated = false;
    this.employeeStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearEmployeeData();
    this.router.navigate(["/loginpage"]);

  }


  private setEmployeeTimer(duration: number) {
    console.log("Setting Timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveEmployeeData(token: string, exprirationDate: Date, employeeId: string) {

    localStorage.setItem("token", token);
    localStorage.setItem("exprirationDate", exprirationDate.toISOString());
    localStorage.setItem("employeeId", employeeId);

  }

  private clearEmployeeData() {
    localStorage.removeItem("token");
    localStorage.removeItem("exprirationDate");
    localStorage.removeItem("employeeId");
  }

  private getEmployeeData() {
    const token = localStorage.getItem("token");
    const exprirationDate = localStorage.getItem("exprirationDate");
    const employeeId = localStorage.getItem("employeeId");

    if (!token || !exprirationDate) {
      return false;
    }
    return {
      token: token,
      exprirationDate: new Date(exprirationDate),
      employeeId: employeeId
    }
  }


}
