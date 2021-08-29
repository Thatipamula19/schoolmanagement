import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result.model';

const BackEndUrl = environment.apiUrl + "/result/"

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private results: Result[] = [];
  private updateResults = new Subject<Result[]>();

  constructor(private http: HttpClient) { }

  getResults() {
    this.http.get<{ message: string, results: any }>(BackEndUrl)
      .pipe(map((resultData) => {
        return resultData.results.map((result) => {
          return {
            studentid: result.studentid,
            stdname: result.stdname,
            stdclass: result.stdclass,
            telugu: result.telugu,
            hindi: result.hindi,
            english: result.english,
            maths: result.maths,
            science: result.science,
            social: result.social
          }
        })
      })).subscribe(tranformedData => {
        this.results = tranformedData;
        this.updateResults.next([...this.results]);
      })
  }


  getResultUpadateListener() {
    return this.updateResults.asObservable();
  }

  getResult(studentid: string) {
    return this.http.get<{
      _id: string, studentid: string, stdname: string, stdclass: string, telugu: number, hindi: number, english: number, maths: number,
      science: number, social: number
    }>(BackEndUrl + studentid);
  }

  addResult(studentid: string, stdname: string, stdclass: string, telugu: number, hindi: number, english: number, maths: number,
    science: number, social: number
  ) {

    const result: Result = {
      id: 'null',
      studentid: studentid, stdname: stdname, stdclass: stdclass, telugu: telugu, hindi: hindi, english: english,
      maths: maths, science: science, social: social
    }
    this.http.post<{ message: string, studentid: string }>(BackEndUrl, result)
      .subscribe(responseData => {
        const stdid = responseData.studentid;
        this.results.push(result);
        this.updateResults.next([...this.results]);

      })

  }

  updateResult(id: string, studentid: string, stdname: string, stdclass: string, telugu: number, hindi: number, english: number, maths: number,
    science: number, social: number) {
    const result: Result = {
      id: id, studentid: studentid, stdname: stdname, stdclass: stdclass, telugu: telugu, hindi: hindi, english: english,
      maths: maths, science: science, social: social
    }

    this.http.put<{ message: string, studentid: string }>(BackEndUrl + studentid, result)
      .subscribe(responseData => {
        const stdid = responseData.studentid;
        this.results.push(result);
        this.updateResults.next([...this.results]);

      })
  }

  deleteResult(studentid: string) {
    this.http.delete(BackEndUrl + studentid)
      .subscribe(() => {
        const updateAdimision = this.results.filter(result => result.studentid !== studentid);
        this.results = updateAdimision;
        this.updateResults.next([...this.results]);

      })
  }
}
