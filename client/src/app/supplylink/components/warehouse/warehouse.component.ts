
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplyLinkService } from '../../services/supplylink.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  warehouseForm!: FormGroup;
  submitted = false;
  serverError: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private supplyLinkService: SupplyLinkService) {}

  ngOnInit(): void {
    this.warehouseForm = this.fb.group({
      supplierId: [null, [Validators.required, Validators.min(1)]],
      warehouseName: ['', [Validators.required, this.noSpecialCharacters]],
      location: [''],
      capacity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.warehouseForm.controls;
  }

  private noSpecialCharacters(control: AbstractControl): ValidationErrors | null {
    const val = (control.value || '') as string;
    return /^[a-zA-Z0-9 \-_.]+$/.test(val) ? null : { specialChars: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;
    this.successMessage = null;

    if (this.warehouseForm.invalid) return;

const raw = this.warehouseForm.value;
const payload = {
  warehouseName: raw.warehouseName,
  location: raw.location,
  capacity: raw.capacity === '' ? 0 : Number(raw.capacity),
  supplier: { supplierId: Number(raw.supplierId) }
};


    this.supplyLinkService.addWarehouse(payload as any).subscribe({
      next: () => {
        this.successMessage = 'Warehouse created successfully';
        this.warehouseForm.reset({
          supplierId: null,
          warehouseName: '',
          location: '',
          capacity: ''
        });
        this.submitted = false;
      },
      error: (err: HttpErrorResponse) => {
        this.serverError = err?.message || 'Failed to create warehouse';
      }
    });
  }
}