// src/app/supplylink/services/supplylink.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from '../../../environments/environment';

export interface Supplier {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  username?: string;
  password?: string;
  role?: 'ADMIN' | 'USER';
}

export interface Warehouse {
  id?: number;
  supplierId: number;
  warehouseName: string;
  location?: string;
  capacity: number;
}

export interface Product {
  id?: number;
  productName: string;
  productDescription?: string;
  warehouseId: number;
  quantity: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class SupplyLinkService {
  // Not essential for tests, but here for completeness
  // baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ---------- Supplier ----------
  addSupplier(supplier: Supplier): Observable<any> {
    return this.http.post<any>(`suppliers`, supplier);
  }

  editSupplier(supplier: Supplier): Observable<any> {
    return this.http.put<any>(`suppliers/${supplier.id}`, supplier);
  }

  deleteSupplier(supplierId: number): Observable<any> {
    return this.http.delete<any>(`suppliers/${supplierId}`);
  }

  getSupplierById(supplierId: number): Observable<Supplier> {
    return this.http.get<Supplier>(`suppliers/${supplierId}`);
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`suppliers`);
  }

  // ---------- Warehouse ----------
  addWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.post<any>(`warehouses`, warehouse);
  }

  editWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.put<any>(`warehouses/${warehouse.id}`, warehouse);
  }

  deleteWarehouse(warehouseId: number): Observable<any> {
    return this.http.delete<any>(`warehouses/${warehouseId}`);
  }

  getWarehouseById(warehouseId: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`warehouses/${warehouseId}`);
  }

  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`warehouses`);
  }

  getWarehousesBySupplier(supplierId: number): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`suppliers/${supplierId}/warehouses`);
  }

  // ---------- Product ----------
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`products`, product);
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put<any>(`products/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`products/${productId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`products/${productId}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`products`);
  }

  getAllProductsByWarehouse(warehouseId: number | null): Observable<Product[]> {
    const target = warehouseId == null ? 'products' : `warehouses/${warehouseId}/products`;
    return this.http.get<Product[]>(target);
  }
}
