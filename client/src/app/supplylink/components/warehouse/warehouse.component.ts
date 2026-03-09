// // src/app/supplylink/components/warehouse/warehouse.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-warehouse',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './warehouse.component.html',
//   styleUrls: ['./warehouse.component.scss']
// })
// export class WarehouseComponent implements OnInit {
//   warehouseForm!: FormGroup;
//   submitted = false;
//   lastSubmitted: any = null;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.warehouseForm = this.fb.group({
//       warehouseId: [0],
//       supplierId: [null, [Validators.required, Validators.min(1)]],
//       warehouseName: ['', Validators.required],
//       location: [''],
//       capacity: [0, [Validators.min(0)]]
//     });
//   }

//   onSubmit(): void {
//     this.submitted = true;
//     if (this.warehouseForm.valid) {
//       this.lastSubmitted = this.warehouseForm.value;
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

// @Component({
//   selector: 'app-warehouse',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './warehouse.component.html',
//   styleUrls: ['./warehouse.component.scss']
// })
// export class WarehouseComponent implements OnInit {
//   warehouseForm!: FormGroup;
//   submitted = false;
//   serverError: string | null = null;
//   successMessage: string | null = null;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.warehouseForm = this.fb.group({
//       supplierId: [null, [Validators.required, Validators.min(1)]],
//       warehouseName: ['', [Validators.required, this.noSpecialCharacters()]],
//       location: [''],
//       capacity: [0, [Validators.required, Validators.min(0)]],
//       email: ['', [Validators.email]]
//     });
//   }

//   onSubmit(): void {
//     this.submitted = true;
//     this.serverError = null;
//     this.successMessage = null;
//     if (this.warehouseForm.invalid) return;
//     if (this.simulateBackendError(this.warehouseForm.value.warehouseName)) {
//       this.serverError = 'Warehouse name already exists.';
//       return;
//     }
//     this.successMessage = 'Warehouse saved successfully.';
//   }

//   simulateBackendError(name: string): boolean {
//     const taken = ['Central Depot', 'Main Hub'];
//     return !!name && taken.map(s => s.toLowerCase()).includes(name.toLowerCase());
//   }

//   private noSpecialCharacters() {
//     const regex = /^[A-Za-z0-9 _-]+$/;
//     return (control: AbstractControl): ValidationErrors | null => {
//       const v = control.value as string;
//       if (v == null || v === '') return null;
//       return regex.test(v) ? null : { specialChars: true };
//     };
//   }

//   get f() { return this.warehouseForm.controls; }
// }


// src/app/supplylink/components/warehouse/warehouse.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  warehouseForm!: FormGroup;
  submitted = false;
  serverError: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.warehouseForm = this.fb.group({
      supplierId: [null, [Validators.required, Validators.min(1)]],
      warehouseName: ['', [Validators.required, this.noSpecialCharacters()]],
      location: [''],
      capacity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;
    this.successMessage = null;
    if (this.warehouseForm.invalid) return;
    if (this.simulateBackendError(this.warehouseForm.value.warehouseName)) {
      this.serverError = 'Warehouse name already exists.';
      return;
    }
    this.successMessage = 'Warehouse saved successfully.';
  }

  simulateBackendError(name: string): boolean {
    const taken = ['Central Depot', 'Main Hub'];
    return !!name && taken.map(s => s.toLowerCase()).includes(name.toLowerCase());
  }

  private noSpecialCharacters() {
    const regex = /^[A-Za-z0-9 _-]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const v = control.value as string;
      if (v == null || v === '') return null;
      return regex.test(v) ? null : { specialChars: true };
    };
  }

  get f() { return this.warehouseForm.controls; }
}