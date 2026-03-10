// // // src/app/supplylink/components/warehouse/warehouse.component.ts
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-warehouse',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule],
// //   templateUrl: './warehouse.component.html',
// //   styleUrls: ['./warehouse.component.scss']
// // })
// // export class WarehouseComponent implements OnInit {
// //   warehouseForm!: FormGroup;
// //   submitted = false;
// //   lastSubmitted: any = null;

// //   constructor(private fb: FormBuilder) {}

// //   ngOnInit(): void {
// //     this.warehouseForm = this.fb.group({
// //       warehouseId: [0],
// //       supplierId: [null, [Validators.required, Validators.min(1)]],
// //       warehouseName: ['', Validators.required],
// //       location: [''],
// //       capacity: [0, [Validators.min(0)]]
// //     });
// //   }

// //   onSubmit(): void {
// //     this.submitted = true;
// //     if (this.warehouseForm.valid) {
// //       this.lastSubmitted = this.warehouseForm.value;
// //     }
// //   }
// // }

// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

// // @Component({
// //   selector: 'app-warehouse',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule],
// //   templateUrl: './warehouse.component.html',
// //   styleUrls: ['./warehouse.component.scss']
// // })
// // export class WarehouseComponent implements OnInit {
// //   warehouseForm!: FormGroup;
// //   submitted = false;
// //   serverError: string | null = null;
// //   successMessage: string | null = null;

// //   constructor(private fb: FormBuilder) {}

// //   ngOnInit(): void {
// //     this.warehouseForm = this.fb.group({
// //       supplierId: [null, [Validators.required, Validators.min(1)]],
// //       warehouseName: ['', [Validators.required, this.noSpecialCharacters()]],
// //       location: [''],
// //       capacity: [0, [Validators.required, Validators.min(0)]],
// //       email: ['', [Validators.email]]
// //     });
// //   }

// //   onSubmit(): void {
// //     this.submitted = true;
// //     this.serverError = null;
// //     this.successMessage = null;
// //     if (this.warehouseForm.invalid) return;
// //     if (this.simulateBackendError(this.warehouseForm.value.warehouseName)) {
// //       this.serverError = 'Warehouse name already exists.';
// //       return;
// //     }
// //     this.successMessage = 'Warehouse saved successfully.';
// //   }

// //   simulateBackendError(name: string): boolean {
// //     const taken = ['Central Depot', 'Main Hub'];
// //     return !!name && taken.map(s => s.toLowerCase()).includes(name.toLowerCase());
// //   }

// //   private noSpecialCharacters() {
// //     const regex = /^[A-Za-z0-9 _-]+$/;
// //     return (control: AbstractControl): ValidationErrors | null => {
// //       const v = control.value as string;
// //       if (v == null || v === '') return null;
// //       return regex.test(v) ? null : { specialChars: true };
// //     };
// //   }

// //   get f() { return this.warehouseForm.controls; }
// // }


// // src/app/supplylink/components/warehouse/warehouse.component.ts
// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

// @Component({
//   selector: 'app-warehouse',
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
//       capacity: [0, [Validators.required, Validators.min(0)]]
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

// src/app/supplylink/components/warehouse.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';
// import { SupplyLinkService, Warehouse, Supplier } from '../../services/supplylink.service';

// @Component({
//   selector: 'app-warehouse-form',
//   templateUrl: './warehouse.component.html',
  
  
// })
// export class WarehouseComponent implements OnInit {
//   serverError : string | null = null;
//   warehouseForm !: FormGroup;
//   warehouse: any | null = null;

//   successMessage: string | null = null;
//   errorMessage: string | null = null;

//   suppliers: any[] = [];

//   constructor(private fb: FormBuilder, private supplyLinkService: SupplyLinkService) {}

//   ngOnInit(): void {
//     this.warehouseForm = this.fb.group({
//       supplierId: [null, [Validators.required]],
//       warehouseName: ['', [Validators.required]],
//       location: [''],
//       capacity: ['', [this.nonNegative]]
//     });

//     this.loadSuppliers();
//   }

//   loadSuppliers(): void {
//     this.supplyLinkService.getAllSuppliers().subscribe({
//       next: res => (this.suppliers = res || []),
//       error: () => (this.suppliers = [])
//     });
//   }

//   onSubmit(): void {
//     this.successMessage = null;
//     this.errorMessage = null;
//     if (this.warehouseForm.invalid) return;

//     const payload: Warehouse = this.warehouseForm.value;
//     this.supplyLinkService.addWarehouse(payload).subscribe({
//       next: res => {
//         this.warehouse = res || payload;
//         this.successMessage = 'Warehouse created successfully';
//         this.warehouseForm.reset({ capacity: 0 });
//       },
//       error: (err: HttpErrorResponse) => this.handleError(err)
//     });
//   }

//   private handleError(error: HttpErrorResponse): void {
//     this.errorMessage = error?.message || 'Failed to create warehouse';
//   }

//   private nonNegative(ctrl: AbstractControl): ValidationErrors | null {
//     // if()
//     if(ctrl.value == '' || ctrl.value == null) return null;
//     const v = Number(ctrl.value);
//     return Number.isFinite(v) && v >= 0 ? null : { nonNegative: true };
//   }
// }

// src/app/supplylink/components/warehouse/warehouse.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplyLinkService } from '../../services/supplylink.service';

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

  constructor(private fb: FormBuilder, private supplyLinkService: SupplyLinkService) {}

  ngOnInit(): void {
    this.warehouseForm = this.fb.group({
      supplierId: [null, [Validators.required, Validators.min(1)]],
      warehouseName: ['', [Validators.required, this.noSpecialCharacters]],
      location: [''],
      capacity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.warehouseForm.controls;
  }

  private noSpecialCharacters(control: AbstractControl): ValidationErrors | null {
    const val = (control.value || '') as string;
    return /^[a-zA-Z0-9 \-_.]+$/.test(val) ? null : { specialChars: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;
    this.successMessage = null;

    if (this.warehouseForm.invalid) return;

    const raw = this.warehouseForm.value;
    const payload = {
      ...raw,
      capacity: raw.capacity === '' ? 0 : Number(raw.capacity)
    };

    this.supplyLinkService.addWarehouse(payload as any).subscribe({
      next: () => {
        this.successMessage = 'Warehouse created successfully';
        this.warehouseForm.reset({
          supplierId: null,
          warehouseName: '',
          location: '',
          capacity: ''
        });
        this.submitted = false;
      },
      error: (err: HttpErrorResponse) => {
        this.serverError = err?.message || 'Failed to create warehouse';
      }
    });
  }
}