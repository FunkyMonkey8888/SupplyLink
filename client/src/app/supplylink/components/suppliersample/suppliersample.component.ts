import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../types/Supplier';
import { of } from 'rxjs';

@Component({
  selector: 'app-suppliersample',
  standalone: true,
  imports: [], 
  templateUrl: './suppliersample.component.html',
  styleUrls: ['./suppliersample.component.css'] 
})
// // src/app/supplylink/components/SupplierSample.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Supplier } from '../../supplylink/types/Supplier';

@Component({
  selector: 'app-supplier-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppliersample.component.html',
  styleUrls: ['./suppliersample.component.css']
})
export class SupplierSampleComponent {
  supplier: Supplier;

  constructor() {
    // Predefined sample data (you can change these)
    this.supplier = new Supplier(
      1,                      // supplierId (number)
      'John Wane',            // supplierName
      'johnwane@gmail.com',   // email
      '+91-99999-11111',      // phone
      'Hyderabad, Telangana', // address
      'johnw',                // username
      'Pass@123',             // password
      'admin'                 // role (optional)
    );
  }
}
