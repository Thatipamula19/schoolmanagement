import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student.model';

const BackEndUrl = environment.apiUrl + "/adimision/login";

@Injectable({
  providedIn: 'root'
})
export class StudentLoginService {

  isAuthenticated = false;

  private token: string;
  private tokenTimer: any;
  private studentId: any;
  private studentStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getStudentStatusListner() {
    return this.studentStatusListener;
  }

  getStudentId() {
    return this.studentId;
  }

  getIsStudent() {
    return this.isAuthenticated;
  }



  login(studentid: string, stddob: string) {
    const student: Student = { studentid: studentid, stddob: stddob }
    this.http.post<{ token: string, expiresIn: number, studentid: string }>(BackEndUrl, student)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expriesInDuration = response.expiresIn;
          console.log(response.expiresIn);
          this.setStudentTimer(expriesInDuration);
          this.isAuthenticated = true;
          this.studentId = response.studentid;
          this.studentStatusListener.next(true);
          const now = new Date();
          const exprirationDate = new Date(now.getTime() + expriesInDuration * 1000);
          console.log(exprirationDate);
          this.saveStudentData(token, exprirationDate, this.studentId);
          this.router.navigate(["/"]);

        }


      }, error => {
        this.studentStatusListener.next(false);
      })
  }



  autoStudent() {
    const studentInformation = this.getStudentData();

    if (!studentInformation) {
      return;
    }

    const now = new Date();
    const expriesIn = studentInformation.exprirationDate.getTime()
      - now.getTime();
    this.token = studentInformation.token;
    this.isAuthenticated = true;
    this.studentId = studentInformation.studentId;
    this.setStudentTimer(expriesIn / 1000);
    this.studentStatusListener.next(true);

  }

  logout() {
    this.token = '';
    this.studentId = null;
    this.isAuthenticated = false;
    this.studentStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearStudentData();
    this.router.navigate(["/loginpage"]);

  }


  private setStudentTimer(duration: number) {
    console.log("Setting Timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveStudentData(token: string, exprirationDate: Date, studentId: string) {

    localStorage.setItem("token", token);
    localStorage.setItem("exprirationDate", exprirationDate.toISOString());
    localStorage.setItem("studentId", studentId);

  }

  private clearStudentData() {
    localStorage.removeItem("token");
    localStorage.removeItem("exprirationDate");
    localStorage.removeItem("studentId");
  }

  private getStudentData() {
    const token = localStorage.getItem("token");
    const exprirationDate = localStorage.getItem("exprirationDate");
    const studentId = localStorage.getItem("studentId");

    if (!token || !exprirationDate) {
      return false;
    }
    return {
      token: token,
      exprirationDate: new Date(exprirationDate),
      studentId: studentId
    }
  }


}
