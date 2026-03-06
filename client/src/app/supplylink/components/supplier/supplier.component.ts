// // src/app/supplylink/components/Supplier.Component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { BehaviorSubject } from 'rxjs';
// import { Supplier } from '../../types/Supplier';

// @Component({
//   selector: 'app-supplier',
// //   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './supplier.component.html',
//   styleUrls: ['./supplier.component.scss'],
// })
// export class SupplierComponent implements OnInit {
//   // Reactive form
//   supplierForm!: FormGroup;

//   // Predefined Supplier instance (can be used to prefill, if needed)
//   supplier: Supplier = new Supplier(
//     1,                          // supplierId
//     'John Wane',                // supplierName
//     'johnwane@gmail.com',       // email
//     '+91-99999-11111',          // phone
//     'Hyderabad, Telangana',     // address
//     'johnw',                    // username
//     'Pass@123',                 // password
//     'admin'                     // role (optional)
//   );

//   // Streams for messages used with async pipe in template
//   private supplierErrorSubject = new BehaviorSubject<string | null>(null);
//   private supplierSuccessSubject = new BehaviorSubject<string | null>(null);

//   supplierError$ = this.supplierErrorSubject.asObservable();
//   supplierSuccess$ = this.supplierSuccessSubject.asObservable();

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     // Build reactive form with validation rules
//     this.supplierForm = this.fb.group({
//       name: [
//         this.supplier.supplierName,
//         [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
//       ],
//       email: [
//         this.supplier.email,
//         [Validators.required, Validators.email, Validators.maxLength(100)],
//       ],
//       username: [
//         this.supplier.username,
//         [
//           Validators.required,
//           Validators.pattern(/^[A-Za-z0-9_]+$/), // letters, numbers, underscores
//           Validators.minLength(3),
//           Validators.maxLength(20),
//         ],
//       ],
//       password: [
//         '', // never prefill actual password fields in real apps
//         [Validators.required, Validators.minLength(8)],
//       ],
//     });

//     // Reset messages when form changes
//     this.supplierForm.valueChanges.subscribe(() => {
//       this.supplierErrorSubject.next(null);
//       this.supplierSuccessSubject.next(null);
//     });
//   }

//   // Convenience getters for template
//   get name() { return this.supplierForm.get('name'); }
//   get email() { return this.supplierForm.get('email'); }
//   get username() { return this.supplierForm.get('username'); }
//   get password() { return this.supplierForm.get('password'); }

//   onSubmit(): void {
//     this.supplierErrorSubject.next(null);
//     this.supplierSuccessSubject.next(null);

//     if (this.supplierForm.invalid) {
//       this.supplierForm.markAllAsTouched();
//       this.supplierErrorSubject.next('Please fix the errors highlighted below.');
//       return;
//     }

//     // Simulate "save" — in a real app you’d call an HTTP service here.
//     const payload = this.supplierForm.value;
//     // Update local Supplier instance to demonstrate two-way-like flow
//     this.supplier.supplierName = payload.name;
//     this.supplier.email = payload.email;
//     this.supplier.username = payload.username;
//     this.supplier.password = payload.password;

//     // Emit success
//     this.supplierSuccessSubject.next('Supplier saved successfully!');
//     // Optionally log to console to help with tests or debugging
//     console.log('Supplier saved:', {
//       id: this.supplier.supplierId,
//       name: this.supplier.supplierName,
//       email: this.supplier.email,
//       username: this.supplier.username,
//       role: this.supplier.role,
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Supplier } from '../../types/Supplier';

@Component({
  selector: 'app-supplier',

  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {

  supplierForm!: FormGroup;


  supplier: Supplier = new Supplier(
    1, 'John Wane', 'johnwane@gmail.com', '+91-99999-11111',
    'Hyderabad, Telangana', 'johnw', 'Pass@123', 'admin'
  );

  private supplierErrorSubject = new BehaviorSubject<string | null>(null);
  private supplierSuccessSubject = new BehaviorSubject<string | null>(null);

  supplierError$ = this.supplierErrorSubject.asObservable();
  supplierSuccess$ = this.supplierSuccessSubject.asObservable();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9_]+$/),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  
    this.supplierForm.valueChanges.subscribe(() => {
      this.supplierErrorSubject.next(null);
      this.supplierSuccessSubject.next(null);
    });
  }

  get name() { return this.supplierForm.get('name'); }
  get email() { return this.supplierForm.get('email'); }
  get username() { return this.supplierForm.get('username'); }
  get password() { return this.supplierForm.get('password'); }

  onSubmit(): void {
    this.supplierErrorSubject.next(null);
    this.supplierSuccessSubject.next(null);

    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      this.supplierErrorSubject.next('Please fix the errors highlighted below.');
      return;
    }

    const { name, email, username, password } = this.supplierForm.value;

    this.supplier.supplierName = name;
    this.supplier.email = email;
    this.supplier.username = username;
    this.supplier.password = password;

    this.supplierSuccessSubject.next('Supplier saved successfully!');
    console.log('Supplier saved:', {
      id: this.supplier.supplierId,
      name: this.supplier.supplierName,
      email: this.supplier.email,
      username: this.supplier.username,
      role: this.supplier.role,
    });
  }
}