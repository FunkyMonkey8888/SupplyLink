import { Supplier } from "./Supplier";
export class Warehouse {
  warehouseId: number;
  supplier: Supplier;
  warehouseName: string;
  location: string;
  capacity: number;
  // displayInfo?(): void;

  constructor(
    warehouseId: number,
    supplier: Supplier,
    warehouseName: string,
    location: string,
    capacity: number
  ) {
    this.warehouseId = warehouseId;
    this.supplier = supplier;
    this.warehouseName = warehouseName;
    this.location = location;
    this.capacity = capacity;
  }

  displayInfo?(): void {
    console.log(
      `Warehouse ID: ${this.warehouseId}, Supplier ID: ${this.supplier}, Capacity: ${this.capacity}`
    );
  }
}