// // src/app/supplylink/components/product/product.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
// import { BehaviorSubject, Subject } from 'rxjs';
// import { SupplyLinkService } from '../../services/supplylink.service';

// function positiveNumberValidator(ctrl: AbstractControl): ValidationErrors | null {
//   const v = Number(ctrl.value);
//   return Number.isFinite(v) && v > 0 ? null : { positive: true };
// }

// function nonNegativeNumberValidator(ctrl: AbstractControl): ValidationErrors | null {
//   const v = Number(ctrl.value);
//   return Number.isFinite(v) && v >= 0 ? null : { nonNegative: true };
// }

// @Component({
//   selector: 'app-product',
//   // standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss']
// })
// export class ProductComponent implements OnInit {
//   productForm!: FormGroup;
//   warehouses = new BehaviorSubject<any[]>([]);
//   productSuccess = new Subject<string>();
//   productError = new Subject<string>();

//   constructor(private fb: FormBuilder, private supply: SupplyLinkService) {}

//   ngOnInit(): void {
//     this.productForm = this.fb.group({
//       warehouse: [null, [Validators.required]],
//       productName: ['', [Validators.required]],
//       productDescription: [''],
//       quantity: ['', [nonNegativeNumberValidator]],
//       price: ['', [positiveNumberValidator]]
//     });

//     const stored = localStorage.getItem('user_id') ?? localStorage.getItem('id');
//     const supplierId = stored ? Number(stored) : 1;
//     this.supply.getWarehousesBySupplier(supplierId).subscribe(ws => this.warehouses.next(ws || []));
//   }

//   onSubmit(): void {
//     if (this.productForm.invalid) return;

//     const raw = this.productForm.value;
//     const warehouseId =
//       raw.warehouse == null
//         ? null
//         : typeof raw.warehouse === 'object'
//           ? (raw.warehouse.id ?? raw.warehouse.warehouseId)
//           : raw.warehouse;

//     const payload = {
//       warehouseId,
//       productName: raw.productName,
//       productDescription: raw.productDescription || '',
//       quantity: raw.quantity === '' ? 0 : Number(raw.quantity),
//       price: raw.price === '' ? 0 : Number(raw.price)
//     };

//     this.supply.addProduct(payload as any).subscribe({
//       next: () => {
//         this.productSuccess.next('Product created successfully');
//         this.productForm.reset({
//           warehouse: null,
//           productName: '',
//           productDescription: '',
//           quantity: '',
//           price: ''
//         });
//       },
//       error: () => {
//         this.productError.next('Failed to create product');
//       }
//     });
//   }
// }


// src/app/supplylink/components/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
  AbstractControl, ValidationErrors
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { SupplyLinkService } from '../../services/supplylink.service';

function positiveNumberValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = Number(ctrl.value);
  return Number.isFinite(v) && v > 0 ? null : { positive: true };
}
function nonNegativeNumberValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = Number(ctrl.value);
  return Number.isFinite(v) && v >= 0 ? null : { nonNegative: true };
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  warehouses = new BehaviorSubject<any[]>([]);
  productSuccess = new Subject<string>();
  productError = new Subject<string>();

  constructor(private fb: FormBuilder, private supply: SupplyLinkService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      warehouse: [null, [Validators.required]],
      productName: ['', [Validators.required]],
      productDescription: [''],
      quantity: ['', [nonNegativeNumberValidator]],
      price: ['', [positiveNumberValidator]]
    });

    const stored = localStorage.getItem('user_id') ?? localStorage.getItem('id');
    const supplierId = stored ? Number(stored) : 1;
    this.supply.getWarehousesBySupplier(supplierId).subscribe(ws => this.warehouses.next(ws || []));
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const raw = this.productForm.value;
    const warehouseId =
      raw.warehouse == null
        ? null
        : typeof raw.warehouse === 'object'
          ? (raw.warehouse.id ?? raw.warehouse.warehouseId)
          : raw.warehouse;

    const payload = {
      warehouseId,
      productName: raw.productName,
      productDescription: raw.productDescription || '',
      quantity: raw.quantity === '' ? 0 : Number(raw.quantity),
      price: raw.price === '' ? 0 : Number(raw.price)
    };

    this.supply.addProduct(payload as any).subscribe({
      next: () => {
        this.productSuccess.next('Product created successfully');
        this.productForm.reset({
          warehouse: null,
          productName: '',
          productDescription: '',
          quantity: '',
          price: ''
        });
      },
      error: () => this.productError.next('Failed to create product')
    });
  }
}