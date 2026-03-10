// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('auth_role');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_role');
    const nav = (this.router as any)?.navigateByUrl;
    if (typeof nav === 'function') {
      this.router.navigateByUrl('/auth/login');
    }
  }
}