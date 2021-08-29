import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adimin } from './adimin.model';

const BackEndUrl = environment.apiUrl + "/adimin/";
@Injectable({
  providedIn: 'root'
})
export class AdiminLoginService {
  isAuthenticated = false;
  private adiminId: any;
  private token: string;
  private tokenTimer: any;
  private adiminStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }
  getToken() {
    return this.token;
  }

  getAdiminStatusListner() {
    return this.adiminStatusListener;
  }

  getadiminId() {
    return this.adiminId;
  }

  getIsAdimin() {
    return this.isAuthenticated;
  }

  adiminLogin(username: string, password: string) {
    const adimin: Adimin = { username: username, password: password }
    this.http.post<{ token: string, expiresIn: number, adiminId: string }>(BackEndUrl, adimin)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expriesInDuration = response.expiresIn;
          this.setAdiminTimer(expriesInDuration);
          this.isAuthenticated = true;
          this.adiminId = response.adiminId;
          this.adiminStatusListener.next(true);
          const now = new Date();
          const exprirationDate = new Date(now.getTime() + expriesInDuration * 1000);
          this.saveAdimin(token, exprirationDate, this.adiminId);
          this.router.navigate(["/"]);

        }
      })
  }



  autoAdimin() {
    const adiminInformation = this.getAdiminData();

    if (!adiminInformation) {
      return;
    }
    const now = new Date();
    const expriesIn = adiminInformation.exprirationDate.getTime() - now.getTime();
    this.token = adiminInformation.token;
    this.isAuthenticated = true;
    this.adiminId = adiminInformation.adiminId;
    this.setAdiminTimer(expriesIn / 1000);
    this.adiminStatusListener.next(true);
  }
  logout() {
    this.token = 'null';
    this.adiminId = null;
    this.isAuthenticated = false;
    this.adiminStatusListener.next(false);

    clearTimeout(this.tokenTimer);
    this.clearAdimin();
    this.router.navigate(["/loginpage"]);
  }

  private setAdiminTimer(duration: number) {
    console.log("Set Timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  saveAdimin(token: string, exprirationDate: Date, adiminId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("exprirationDate", exprirationDate.toISOString());
    localStorage.setItem("adiminId", adiminId);
  }

  clearAdimin() {
    localStorage.removeItem("token");
    localStorage.removeItem("exprirationDate")
    localStorage.removeItem("adiminId");
  }

  getAdiminData() {
    const token = localStorage.getItem("token");
    const exprirationDate = localStorage.getItem("exprirationDate");
    const adiminId = localStorage.getItem("adiminId");

    if (!token || !exprirationDate) {
      return false;
    }
    return {
      token: token,
      exprirationDate: new Date(exprirationDate),
      adiminId: adiminId
    }
  }
}
