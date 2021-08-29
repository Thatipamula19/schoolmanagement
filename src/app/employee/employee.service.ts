import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from './employee.model';

const BackEndUrl = environment.apiUrl + "/employee/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  private updateEmployee = new Subject<Employee[]>();

  constructor(private http: HttpClient) { }

  getEmployees() {
    this.http.get<{ message: string, employees: any }>(BackEndUrl)
      .pipe(map((employees) => {
        return employees.employees.map(employee => {
          return {
            username: employee.username,
            password: employee.password,
            fullname: employee.fullname,
            gender: employee.gender,
            email: employee.email,
            mobile: employee.mobile,
            address: employee.address
          }
        })
      })).subscribe(transformedData => {
        console.log(transformedData);
        this.employees = transformedData;
        this.updateEmployee.next([...this.employees]);
      })
  }

  getEmployeeUpdateListener() {
    return this.updateEmployee.asObservable();
  }

  addEmployee(username: string, password: string, fullname: string, gender: string, email: string, mobile: string,
    address: string
  ) {
    const employee: Employee = {
      username: username, password: password, fullname: fullname, gender: gender, email: email, mobile: mobile,
      address: address
    }
    this.http.post<{ message: string, username: string }>(BackEndUrl, employee)
      .subscribe(responseData => {
        const username = responseData.username;
        this.employees.push(employee);
        this.updateEmployee.next([...this.employees])
      })
  }
}
