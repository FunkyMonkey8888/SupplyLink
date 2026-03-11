// src/app/auth/components/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  supplierForm!: FormGroup;
  message = '';
  submitting = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      supplierName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      // role: ['USER', Validators.required] // must be uppercase USER or ADMIN
      role: ['USER']
    });
  }

  // Easy access to form controls in template
  get f(): { [key: string]: AbstractControl } {
    return this.supplierForm.controls;
  }

  onSubmit(): void {
    if (this.supplierForm.invalid || this.submitting) return;

    this.submitting = true;
    this.message = '';

    this.auth.createUser(this.supplierForm.value).subscribe({
      next: () => {
        this.message = 'Supplier registered successfully.';
        this.supplierForm.reset({ role: 'USER' }); // keep role default
        this.submitting = false;
      },
      // src/app/auth/components/user/user.component.ts (in error block)
error: (err) => {
  console.error('REGISTER ERROR', {
    status: err?.status,
    url: err?.url,
    body: err?.error,
  });
  const msg =
    err?.error?.message ||
    (typeof err?.error === 'string' ? err.error : null) ||
    err?.message ||
    'Failed to register supplier.';
  this.message = msg;
  this.submitting = false;
}
    });
  }
}
