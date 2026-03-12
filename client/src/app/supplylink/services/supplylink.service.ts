// src/app/supplylink/services/supplylink.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from '../../../environments/environment';

export interface Supplier {
  id?: number;
  name?: string;
  email: string;
  phone: string;
  address?: string;
  username?: string;
  password?: string;
  role?: string;
  displayInfo?(): void;
}

export interface Warehouse {
  id?: number;
  supplierId?: number;
  warehouseName: string;
  location?: string;
  capacity: number;
  displayInfo?(): void;
}

export interface Product {
  id?: number;
  productName: string;
  productDescription?: string;
  warehouseId?: number;
  quantity: number;
  price: number;
  displayInfo?(): void;
}

@Injectable({ providedIn: 'root' })
export class SupplyLinkService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ---------- Supplier ----------
  addSupplier(supplier: Supplier): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/suppliers`, supplier);
  }

  editSupplier(supplier: Supplier): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/suppliers/${supplier.id}`, supplier);
  }

  deleteSupplier(supplierId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/suppliers/${supplierId}`);
  }

  getSupplierById(supplierId: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${environment.apiUrl}/suppliers/${supplierId}`);
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.apiUrl}/suppliers`);
  }

  // ---------- Warehouse ----------
  addWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/warehouses`, warehouse);
  }

  editWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/warehouses/${warehouse.id}`, warehouse);
  }

  deleteWarehouse(warehouseId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/warehouses/${warehouseId}`);
  }

  getWarehouseById(warehouseId: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${environment.apiUrl}/warehouses/${warehouseId}`);
  }

  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${environment.apiUrl}/warehouses`);
  }

  getWarehousesBySupplier(supplierId: number): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${environment.apiUrl}/warehouses/supplier/${supplierId}`);
  }

  // ---------- Product ----------
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/products`, product);
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/products/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/products/${productId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${productId}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getAllProductsByWarehouse(warehouseId: number | null): Observable<Product[]> {
    const target = warehouseId == null ? `${environment.apiUrl}/products` : `${environment.apiUrl}/warehouses/${warehouseId}/products`;
    return this.http.get<Product[]>(target);
  }
}
