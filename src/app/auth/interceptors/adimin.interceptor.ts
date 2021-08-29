import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AdiminLoginService } from 'src/app/adimin/adimin-login.service';


@Injectable()
export class AdiminInterceptor implements HttpInterceptor {

  constructor(private adiminService: AdiminLoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    const adiminToken = this.adiminService.getToken();
    const adiminRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer" + adiminToken)
    })
    return next.handle(adiminRequest);
  }
}
