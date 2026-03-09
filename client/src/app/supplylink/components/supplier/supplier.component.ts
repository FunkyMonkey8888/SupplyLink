// src/app/supplylink/components/supplier/supplier.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  supplierForm!: FormGroup;
  submitted = false;
  serverError: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      supplierName: ['', [Validators.required, this.noSpecialCharacters()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      username: ['', [Validators.required, this.noSpecialCharacters()]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordPolicy()]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;
    this.successMessage = null;
    if (this.supplierForm.invalid) return;
    const backendError = false;
    if (backendError) {
      this.serverError = 'Backend validation failed.';
      return;
    }
    this.successMessage = 'Supplier registered successfully.';
  }

  private noSpecialCharacters() {
    const regex = /^[A-Za-z0-9 _-]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const v = control.value as string;
      if (v == null || v === '') return null;
      return regex.test(v) ? null : { specialChars: true };
    };
  }

  private passwordPolicy() {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const v = control.value as string;
      if (!v) return null;
      return regex.test(v) ? null : { policy: true };
    };
  }

  get f() { return this.supplierForm.controls; }
}