// // src/app/supplylink/components/dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SupplyLinkService } from '../../services/supplylink.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html'
// })
// export class DashboardComponent implements OnInit {
//   suppliers: any[] = [];
//   warehouses: any[] = [];
//   products: any[] = [];

//   role: string | null = null;
//   userId: number | null = null;

//   productForm!: FormGroup;
//   showProductPopup = false;
//   currentProduct: any = null;
//   selectedWarehouseId: number | null = null;

//   constructor(
//     private supplyLinkService: SupplyLinkService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.role = localStorage.getItem('auth_role') ?? localStorage.getItem('role');
//     const idStr = localStorage.getItem('user_id') ?? localStorage.getItem('id');
//     this.userId = idStr ? Number(idStr) : null;

//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       productDescription: [''],
//       quantity: ['', Validators.required],
//       price: ['', Validators.required]
//     });

//     if (this.role === 'ADMIN') {
//       this.loadAdminData();
//     } else {
//       this.loadUserData();
//     }
//   }

//   loadAdminData(): void {
//     this.supplyLinkService.getAllSuppliers().subscribe(res => (this.suppliers = res || []));
//     this.supplyLinkService.getAllWarehouses().subscribe(res => (this.warehouses = res || []));
//     this.supplyLinkService.getAllProducts().subscribe(res => (this.products = res || []));
//   }

//   loadUserData(): void {
//     if (!this.userId) return;

//     this.supplyLinkService.getSupplierById(this.userId).subscribe(s => {
//       this.suppliers = s ? [s] : [];
//     });

//     this.supplyLinkService.getWarehousesBySupplier(this.userId).subscribe(ws => {
//       this.warehouses = ws || [];
//       const first = this.warehouses[0];
//       this.selectedWarehouseId = first ? (first.id ?? first.warehouseId ?? null) : null;
//       this.refreshProductsForSelectedWarehouse();
//     });
//   }

//   refreshProductsForSelectedWarehouse(): void {
//     if (this.selectedWarehouseId == null) {
//       this.products = [];
//       return;
//     }
//     const fn: any = (this.supplyLinkService as any).getAllProductsByWarehouse;
//     if (typeof fn !== 'function') return;
//     this.supplyLinkService
//       .getAllProductsByWarehouse(this.selectedWarehouseId)
//       .subscribe(ps => (this.products = ps || []));
//   }

//   editProduct(product: any): void {
//     this.currentProduct = product;
//     this.showProductPopup = true;
//     this.productForm.patchValue({
//       productName: product?.productName ?? '',
//       productDescription: product?.productDescription ?? '',
//       quantity: product?.quantity ?? '',
//       price: product?.price ?? ''
//     });
//   }

//   onProductFormSubmit(): void {
//     if (this.productForm.invalid) return;

//     const raw = this.productForm.value;
//     const normQuantity = raw.quantity === '' ? 0 : Number(raw.quantity);
//     const normPrice = raw.price === '' ? 0 : Number(raw.price);

//     const warehouseObj =
//       this.selectedWarehouseId == null
//         ? null
//         : {
//             warehouseId: this.selectedWarehouseId,
//             supplier: { supplierId: (this.userId ?? 1) } // ensure 1 (not 0) when userId missing
//           };

//     if (this.currentProduct && (this.currentProduct.productId || this.currentProduct.id)) {
//       const productId = this.currentProduct.productId ?? this.currentProduct.id;
//       const updatePayload = {
//         productId,
//         productName: raw.productName,
//         productDescription: raw.productDescription ?? '',
//         quantity: normQuantity,
//         price: normPrice,
//         warehouse: warehouseObj
//       };

//       this.supplyLinkService.editProduct(updatePayload as any).subscribe({
//         next: () => {
//           this.showProductPopup = false;
//           this.currentProduct = null;
//           this.refreshProductsForSelectedWarehouse();
//         }
//       });
//     } else {
//       const createPayload = {
//         productName: raw.productName,
//         productDescription: raw.productDescription ?? '',
//         quantity: normQuantity,
//         price: normPrice,
//         warehouseId: this.selectedWarehouseId
//       };

//       this.supplyLinkService.addProduct(createPayload as any).subscribe({
//         next: () => {
//           this.showProductPopup = false;
//           this.currentProduct = null;
//           this.refreshProductsForSelectedWarehouse();
//         }
//       });
//     }
//   }
// }

// src/app/supplylink/components/dashboard/dashboard.component.ts (add/deleteWarehouse method)
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplyLinkService } from '../../services/supplylink.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  suppliers: any[] = [];
  warehouses: any[] = [];
  products: any[] = [];

  role: string | null = null;
  userId: number | null = null;

  productForm!: FormGroup;
  showProductPopup = false;
  currentProduct: any = null;
  selectedWarehouseId: number | null = null;

  constructor(
    private supplyLinkService: SupplyLinkService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('auth_role') ?? localStorage.getItem('role');
    const idStr = localStorage.getItem('user_id') ?? localStorage.getItem('id');
    this.userId = idStr ? Number(idStr) : null;

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });

    if (this.role === 'ADMIN') {
      this.loadAdminData();
    } else {
      this.loadUserData();
    }
  }

  loadAdminData(): void {
    this.supplyLinkService.getAllSuppliers().subscribe(res => (this.suppliers = res || []));
    this.supplyLinkService.getAllWarehouses().subscribe(res => (this.warehouses = res || []));
    this.supplyLinkService.getAllProducts().subscribe(res => (this.products = res || []));
  }

  loadUserData(): void {
    if (!this.userId) return;

    this.supplyLinkService.getSupplierById(this.userId).subscribe(s => {
      this.suppliers = s ? [s] : [];
    });

    this.supplyLinkService.getWarehousesBySupplier(this.userId).subscribe(ws => {
      this.warehouses = ws || [];
      const first = this.warehouses[0];
      this.selectedWarehouseId = first ? (first.id ?? first.warehouseId ?? null) : null;
      this.refreshProductsForSelectedWarehouse();
    });
  }

  refreshProductsForSelectedWarehouse(): void {
    if (this.selectedWarehouseId == null) {
      this.products = [];
      return;
    }
    const fn: any = (this.supplyLinkService as any).getAllProductsByWarehouse;
    if (typeof fn !== 'function') return;
    this.supplyLinkService
      .getAllProductsByWarehouse(this.selectedWarehouseId)
      .subscribe(ps => (this.products = ps || []));
  }

  editProduct(product: any): void {
    this.currentProduct = product;
    this.showProductPopup = true;
    this.productForm.patchValue({
      productName: product?.productName ?? '',
      productDescription: product?.productDescription ?? '',
      quantity: product?.quantity ?? '',
      price: product?.price ?? ''
    });
  }

  onProductFormSubmit(): void {
    if (this.productForm.invalid) return;

    const raw = this.productForm.value;
    const normQuantity = raw.quantity === '' ? 0 : Number(raw.quantity);
    const normPrice = raw.price === '' ? 0 : Number(raw.price);

    const warehouseObj =
      this.selectedWarehouseId == null
        ? null
        : {
            warehouseId: this.selectedWarehouseId,
            supplier: { supplierId: (this.userId ?? 1) }
          };

    if (this.currentProduct && (this.currentProduct.productId || this.currentProduct.id)) {
      const productId = this.currentProduct.productId ?? this.currentProduct.id;
      const updatePayload = {
        productId,
        productName: raw.productName,
        productDescription: raw.productDescription ?? '',
        quantity: normQuantity,
        price: normPrice,
        warehouse: warehouseObj
      };

      this.supplyLinkService.editProduct(updatePayload as any).subscribe({
        next: () => {
          this.showProductPopup = false;
          this.currentProduct = null;
          this.refreshProductsForSelectedWarehouse();
        }
      });
    } else {
      const createPayload = {
        productName: raw.productName,
        productDescription: raw.productDescription ?? '',
        quantity: normQuantity,
        price: normPrice,
        warehouseId: this.selectedWarehouseId
      };

      this.supplyLinkService.addProduct(createPayload as any).subscribe({
        next: () => {
          this.showProductPopup = false;
          this.currentProduct = null;
          this.refreshProductsForSelectedWarehouse();
        }
      });
    }
  }

  deleteWarehouse(w: any): void {
    const id = w?.id ?? w?.warehouseId;
    if (!id) return;
    this.supplyLinkService.deleteWarehouse(Number(id)).subscribe({
      next: () => {
        if (this.role === 'ADMIN') {
          this.loadAdminData();
        } else {
          this.refreshProductsForSelectedWarehouse();
        }
      }
    });
  }
}