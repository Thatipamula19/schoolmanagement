import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessComponent } from 'src/app/common/success/success.component';
import { environment } from 'src/environments/environment';
import { Adimision } from '../models/adimision.model';

const BackEndUrl = environment.apiUrl + "/adimision/"

@Injectable({
  providedIn: 'root'
})
export class StudentadimisionService {
  private adimisions: Adimision[] = [];
  private updatedAdmisions = new Subject<Adimision[]>();

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }


  getAdimisions() {
    this.http.get<{ message: string, adimisions: any }>(BackEndUrl)
      .pipe(map((adimisionData) => {
        return adimisionData.adimisions.map(adimision => {
          return {
            studentid: adimision.studentid,
            stdname: adimision.stdname,
            stdfathername: adimision.stdfathername,
            stdgender: adimision.stdgender,
            stddob: adimision.stdgender,
            stdmobile: adimision.stdmobile,
            stdemail: adimision.stdmobile,
            stdclass: adimision.stdclass,
            stdaddress: adimision.stdaddress
          }
        });
      })).subscribe(transformedData => {
        this.adimisions = transformedData;
        this.updatedAdmisions.next([...this.adimisions]);
      })
  }

  getAdimisionUpdateListener() {
    return this.updatedAdmisions.asObservable();
  }

  getAdimision(studentid: string) {
    return this.http.get<{
      _id: string,
      studentid: string, stdname: string, stdfathername: string, stdgender: string, stddob: string,
      stdmobile: string, stdemail: string, stdclass: string, stdaddress: string
    }>(BackEndUrl + studentid);
  }

  checkDetails(studentid: string) {
    return this.http.get<{
      _id: string,
      studentid: string, stdname: string, stdfathername: string, stdgender: string, stddob: string,
      stdmobile: string, stdemail: string, stdclass: string, stdaddress: string
    }>(BackEndUrl + "checkDetails/"+ studentid);
  }


  newAdimision(studentid: string, stdname: string, stdfathername: string, stdgender: string, stddob: string,
    stdmobile: string, stdemail: string, stdclass: string, stdaddress: string) {
    const adimision: Adimision = {
      id: 'null', studentid: studentid, stdname: stdname, stdfathername: stdfathername, stdgender: stdgender, stddob: stddob,
      stdmobile: stdmobile, stdemail: stdemail, stdclass: stdclass, stdaddress: stdaddress
    }

    this.http.post<{ message: string, studentid: string }>(BackEndUrl, adimision)
      .subscribe((responseData:any) => {
        console.log(responseData);
        const stdid = responseData.studentid;
        this.adimisions.push(adimision);
        this.updatedAdmisions.next([...this.adimisions]);
        let dialogRef = this.dialog.open(SuccessComponent, { data: { message: responseData?.message, studentid: responseData?.studentid } });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['/stddetails', responseData?.studentid]);
         })
      })
  }

  updateAdimision(id: string, studentid: string, stdname: string, stdfathername: string, stdgender: string, stddob: string,
    stdmobile: string, stdemail: string, stdclass: string, stdaddress: string) {

    const adimision: Adimision = {
      id: id,
      studentid: studentid, stdname: stdname, stdfathername: stdfathername, stdgender: stdgender, stddob: stddob,
      stdmobile: stdmobile, stdemail: stdemail, stdclass: stdclass, stdaddress: stdaddress
    }
    this.http.put<{ message: string, studentid: string }>(BackEndUrl + studentid, adimision)
      .subscribe(responseData => {
        const stdid = responseData.studentid;
        this.adimisions.push(adimision);
        this.updatedAdmisions.next([...this.adimisions]);
       let dialogRef = this.dialog.open(SuccessComponent, { data: { message: responseData?.message } });
       dialogRef.afterClosed().subscribe(()=>{
        this.router.navigate(['/stddetails', studentid]);
       })
      })

    console.log(adimision)
  }

  deleteAdimison(studentid: string) {
    this.http.delete(BackEndUrl + studentid)
      .subscribe((res:any) => {
        const updateAdimision = this.adimisions.filter(adimision => adimision.studentid !== studentid);
        this.adimisions = updateAdimision;
        this.updatedAdmisions.next([...this.adimisions]);
        let dialogRef = this.dialog.open(SuccessComponent, { data: { message: res?.message } })
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['/']);
         })
      })
  }


}
