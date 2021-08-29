import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { StudentLoginService } from '../student-login.service';

@Injectable()
export class StudentInterceptor implements HttpInterceptor {

  constructor(private studentService: StudentLoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const studentToken = this.studentService.getToken();
    const studentRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer" + studentToken)
    });
    return next.handle(studentRequest);
  }
}
