import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { LoginService } from '../login.service';

@Injectable()
export class EmployeeInterceptor implements HttpInterceptor {

  constructor(private employeeLoginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const employeeToken = this.employeeLoginService.getToken();
    const employeeRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer" + employeeToken)
    });
    return next.handle(employeeRequest);
  }
}
