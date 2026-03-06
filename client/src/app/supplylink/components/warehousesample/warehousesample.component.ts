// src/app/supplylink/components/WarehouseSample.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Warehouse } from '../../types/Warehouse';

@Component({
  selector: 'app-warehouse-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehousesample.component.html',
  styleUrls: ['./warehousesample.component.css']
})
export class WarehouseSampleComponent {
  warehouse: Warehouse;

  constructor() {

    this.warehouse = new Warehouse(
      12,                // warehouseId: number
      '1',               // supplierId: string
      'Central Depot',   // warehouseName: string
      'Chennai',         // location: string
      5000               // capacity: number
    );
  }
}
``