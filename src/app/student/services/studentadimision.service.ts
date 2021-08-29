import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Adimision } from '../models/adimision.model';

const BackEndUrl = environment.apiUrl + "/adimision/"

@Injectable({
  providedIn: 'root'
})
export class StudentadimisionService {
  private adimisions: Adimision[] = [];
  private updatedAdmisions = new Subject<Adimision[]>();

  constructor(private http: HttpClient) { }


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


  newAdimision(studentid: string, stdname: string, stdfathername: string, stdgender: string, stddob: string,
    stdmobile: string, stdemail: string, stdclass: string, stdaddress: string) {
    const adimision: Adimision = {
      id: 'null', studentid: studentid, stdname: stdname, stdfathername: stdfathername, stdgender: stdgender, stddob: stddob,
      stdmobile: stdmobile, stdemail: stdemail, stdclass: stdclass, stdaddress: stdaddress
    }

    this.http.post<{ message: string, studentid: string }>(BackEndUrl, adimision)
      .subscribe(responseData => {
        const stdid = responseData.studentid;
        this.adimisions.push(adimision);
        this.updatedAdmisions.next([...this.adimisions]);

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

      })

    console.log(adimision)
  }

  deleteAdimison(studentid: string) {
    this.http.delete(BackEndUrl + studentid)
      .subscribe(() => {
        const updateAdimision = this.adimisions.filter(adimision => adimision.studentid !== studentid);
        this.adimisions = updateAdimision;
        this.updatedAdmisions.next([...this.adimisions]);

      })
  }


}
