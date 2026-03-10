import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authService: AuthService;


  constructor(authService: AuthService){
    this.authService = authService;
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error("Method not implemented.");
  // }


  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase();
    if (url.includes('login') || url.includes('add-user')) {
      return next.handle(req);
    }
    const token = this.authService.getToken();
    let headers = req.headers.set('Content-Type', 'application/json').set('Accept', 'application/json');
    const modified = token ? req.clone({ headers: headers.set('Authorization', `Bearer ${token}`) }) : req.clone({ headers });
    return next.handle(modified);
    }

  
  
}
