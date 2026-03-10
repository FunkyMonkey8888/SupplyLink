// src/app/supplylink/components/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { SupplyLinkService, Supplier, Warehouse, Product } from '../services/supplylink.service';
import { SupplyLinkService } from '../../services/supplylink.service';
import { Product, Warehouse, Supplier } from '../../services/supplylink.service';

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

  constructor(private supplyLinkService: SupplyLinkService, private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const idStr = localStorage.getItem('user_id');
    this.userId = idStr ? Number(idStr) : null;

    if (this.role === 'ADMIN') {
      this.loadAdminData();
    }
  }

  loadAdminData(): void {
    this.supplyLinkService.getAllSuppliers().subscribe(res => (this.suppliers = res || []));
    this.supplyLinkService.getAllWarehouses().subscribe(res => (this.warehouses = res || []));
    this.supplyLinkService.getAllProducts().subscribe(res => (this.products = res || []));
  }
}