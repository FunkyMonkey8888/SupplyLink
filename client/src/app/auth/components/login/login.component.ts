import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;
  error = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.invalid || this.loading) return;

    this.error = '';
    this.loading = true;

    const payload = {
      username: this.loginForm.value.username!.trim(),
      password: this.loginForm.value.password!
    };

    this.auth.login(payload).subscribe({
      next: (res: { token: string; roles?: string; userId?: number }) => {
        this.loading = false;

  
        if (res?.token) localStorage.setItem('token', res.token);
        const role = ((res?.roles) ?? 'USER').toUpperCase();
        localStorage.setItem('auth_role', role);
        if (res?.userId != null) localStorage.setItem('userId', String(res.userId));


        this.router.navigateByUrl('/supplylink/dashboard');
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.message ??
          (typeof err?.error === 'string' ? err.error : null) ??
          err?.message ??
          'Invalid credentials';
      }
    });
  }
}


