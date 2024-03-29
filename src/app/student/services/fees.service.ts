import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessComponent } from 'src/app/common/success/success.component';
import { environment } from 'src/environments/environment';
import { Fees } from '../models/fees.model';

const BackEndUrl = environment.apiUrl + "/fees/";

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private feeses: Fees[] = [];
  private updateFeeses = new Subject<Fees[]>();

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  getFeeses() {
    this.http.get<{ message: string, feeses: any }>(BackEndUrl)
      .pipe((map((feesData) => {
        return feesData.feeses.map(fees => {
          return {
            studentid: fees.studentid,
            stdname: fees.stdname,
            stdfathername: fees.stdfathername,
            stdclass: fees.stdclass,
            stdmobile: fees.stdmobile,
            totalamount: fees.totalamount,
            paidamount: fees.paidamount,
            feeterm: fees.feeterm,
            paymentmode: fees.paymentmode,
            paymentdate: fees.paymentdate
          }
        })
      }))).subscribe(transformedData => {
        this.feeses = transformedData,
          this.updateFeeses.next([...this.feeses]);
      })
  }

  getFeesUpdateListener() {
    return this.updateFeeses.asObservable();
  }

  getFees(studentid: string) {
    return this.http.get<{
      _id: string, studentid: string, stdname: string, stdfathername: string, stdclass: string, stdmobile: string, totalamount: number,
      paidamount: number, feeterm: string, paymentmode: string, paymentdate: string
    }>(BackEndUrl + studentid);

  }

  addFees(studentid: string, stdname: string, stdfathername: string, stdclass: string, stdmobile: string, totalamount: number,
    paidamount: number, feeterm: string, paymentmode: string, paymentdate: string) {

    const fees: Fees = {
      id: "null", studentid: studentid, stdname: stdname, stdfathername: stdfathername, stdclass: stdclass, stdmobile: stdmobile, totalamount: totalamount,
      paidamount: paidamount, feeterm: feeterm, paymentmode: paymentmode, paymentdate: paymentdate
    }

    this.http.post<{ message: string, studentid: string }>(BackEndUrl, fees)
      .subscribe(responseData => {
        const stdid = responseData.studentid;
        this.feeses.push(fees);
        this.updateFeeses.next([...this.feeses]);
        let dialogRef = this.dialog.open(SuccessComponent, { data: { message: responseData?.message } });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['/seefees', studentid]);
         })
      });
  }

  updateFees(id: string, studentid: string, stdname: string, stdfathername: string, stdclass: string, stdmobile: string, totalamount: number,
    paidamount: number, feeterm: string, paymentmode: string, paymentdate: string) {
    const fees: Fees = {
      id: id, studentid: studentid, stdname: stdname, stdfathername: stdfathername, stdclass: stdclass, stdmobile: stdmobile, totalamount: totalamount,
      paidamount: paidamount, feeterm: feeterm, paymentmode: paymentmode, paymentdate: paymentdate
    }
    this.http.put<{ message: string, studentid: string }>(BackEndUrl + studentid, fees)
      .subscribe(updatedata => {
        const stdid = updatedata.studentid;
        this.feeses.push(fees);
        this.updateFeeses.next([...this.feeses]);
        let dialogRef = this.dialog.open(SuccessComponent, { data: { message: updatedata?.message } });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['/seefees', studentid]);
         })
      })
  }

  deleteFees(studentid: string) {
    this.http.delete<{ message: string, studentid: string }>(BackEndUrl + studentid)
      .subscribe((res:any) => {
        const updatedFees = this.feeses.filter(fees => fees.studentid !== studentid);
        this.feeses = updatedFees;
        this.updateFeeses.next([...this.feeses]);
        let dialogRef = this.dialog.open(SuccessComponent, { data: { message: res?.message } })
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['/']);
         })
      })
  }
}
