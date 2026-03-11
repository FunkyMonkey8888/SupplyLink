// import { Injectable } from "@angular/core";
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { AuthService } from "./auth/services/auth.service";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   authService: AuthService;


//   constructor(authService: AuthService){
//     this.authService = authService;
//   }
//   // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   //   throw new Error("Method not implemented.");
//   // }


  
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const url = req.url.toLowerCase();
//     if (url.includes('login') || url.includes('add-user')) {
//       return next.handle(req);
//     }
//     const token = this.authService.getToken();
//     let headers = req.headers.set('Content-Type', 'application/json').set('Accept', 'application/json');
//     const modified = token ? req.clone({ headers: headers.set('Authorization', `Bearer ${token}`) }) : req.clone({ headers });
//     return next.handle(modified);
//     }

  
  
// }


// src/app/auth.interceptors.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();
//     if (token) {
//       req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
//     }
//     return next.handle(req);
//   }
// }


export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuth = /\/user\/login$|\/user\/register$/.test(req.url);
    const token = this.auth.getToken();

    if (!token || isAuth) return next.handle(req);
    return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
}


// src/app/auth.interceptors.ts
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth/services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const isAuthEndpoint = /\/user\/login$|\/user\/register$/.test(req.url);
//     const token = this.authService.getToken();

//     if (!token || isAuthEndpoint) {
//       return next.handle(req);
//     }
//     return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
//   }
// }