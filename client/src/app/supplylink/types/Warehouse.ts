import { Supplier } from "./Supplier";
export class Warehouse {
  warehouseId: number;
  supplierId: string;
  warehouseName: string;
  location: string;
  capacity: number;

  constructor(
    warehouseId: number,
    supplierId: string,
    warehouseName: string,
    location: string,
    capacity: number
  ) {
    this.warehouseId = warehouseId;
    this.supplierId = supplierId;
    this.warehouseName = warehouseName;
    this.location = location;
    this.capacity = capacity;
  }

  displayInfo(): void {
    console.log(
      `Warehouse ID: ${this.warehouseId}, Supplier ID: ${this.supplierId}, Capacity: ${this.capacity}`
    );
  }
}