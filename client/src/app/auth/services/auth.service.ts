// // // src/app/auth/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { environment } from '../../../environments/environment';

// type LoginPayload = { username: string; password: string };
// export type LoginResponse = { token: string; role?: 'ADMIN' | 'USER' };

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly base = environment.apiUrl;
//   private readonly tokenKey = 'token';
//   private readonly roleKey = 'auth_role';
//   private role$ = new BehaviorSubject<string | null>(this.getRole());

//   constructor(private http: HttpClient) {}

//   login(payload: LoginPayload): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.base}/login`, payload).pipe(
//       tap(res => {
//         if (res?.token) localStorage.setItem(this.tokenKey, res.token);
//         const role = res?.role ?? 'USER';
//         localStorage.setItem(this.roleKey, role);
//         this.role$.next(role);
//       })
//     );
//   }

//   createUser(payload: any): Observable<any> {
//     return this.http.post<any>(`${this.base}/register`, payload);
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.roleKey);
//     this.role$.next(null);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   getRole(): string | null {
//     return localStorage.getItem(this.roleKey);
//   }

//   roleChanges(): Observable<string | null> {
//     return this.role$.asObservable();
//   }

//   isAdmin(): boolean {
//     return this.getRole() === 'ADMIN';
//   }
// }


// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

type LoginPayload = { username: string; password: string };
type LoginResponse = { token: string; role?: 'ADMIN' | 'USER' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = environment.apiUrl;
  private readonly tokenKey = 'token';
  private readonly roleKey = 'auth_role';
  private readonly userId = 'userId';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/user/register`, payload);
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/user/login`, payload).pipe(
      tap(res => {
        if (res?.token) localStorage.setItem(this.tokenKey, res.token);
        const role = res?.role ?? 'USER';
        localStorage.setItem(this.roleKey, role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userId);
  }
}