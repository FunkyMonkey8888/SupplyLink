// src/app/supplylink/components/warehouseedit/warehouseedit.component.ts
import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplyLinkService } from '../../services/supplylink.service';

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouseedit.component.html',
  styleUrls: ['./warehouseedit.component.scss']
})
export class WarehouseEditComponent implements OnInit {
  warehouseForm!: FormGroup;
  id = 1;
  supplierForEdit: { supplierId: number; supplierName: string } = { supplierId: 1, supplierName: 'Test Supplier' };

  constructor(@Optional() private route: ActivatedRoute, private fb: FormBuilder, private api: SupplyLinkService) {}

  ngOnInit(): void {
    this.warehouseForm = this.fb.group({
      warehouseName: ['', Validators.required],
      location: [''],
      capacity: ['', Validators.required]
    });
  }

  loadWarehouseDetails(): void {
    const idParam = this.route?.snapshot?.paramMap?.get('id');
    this.id = idParam ? Number(idParam) : 1;
    this.api.getWarehouseById(this.id).subscribe((w: any) => {
      this.warehouseForm.patchValue({
        warehouseName: w?.warehouseName ?? '',
        location: w?.location ?? '',
        capacity: w?.capacity ?? ''
      });
    });
  }

  onSubmit(): void {
    if (this.warehouseForm.invalid) return;
    const v = this.warehouseForm.value;
    const payload = {
      warehouseId: this.id,
      warehouseName: v.warehouseName,
      location: v.location,
      capacity: v.capacity,
      supplier: this.supplierForEdit
    };
    this.api.editWarehouse(payload as any).subscribe();
  }
}