// src/app/supply/components/supplieredit/supplieredit.component.ts
import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplyLinkService } from '../../services/supplylink.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplieredit.component.html',
  styleUrls: ['./supplieredit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  supplierForm!: FormGroup;
  id = 1;

  constructor(@Optional() private route: ActivatedRoute, private fb: FormBuilder, private api: SupplyLinkService) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      supplierName: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      address: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['USER', Validators.required]
    });

    this.supplierForm.get('name')!.valueChanges.subscribe(v => {
      if (this.supplierForm.get('supplierName')!.value !== v) {
        this.supplierForm.get('supplierName')!.setValue(v, { emitEvent: false });
      }
    });
    this.supplierForm.get('supplierName')!.valueChanges.subscribe(v => {
      if (this.supplierForm.get('name')!.value !== v) {
        this.supplierForm.get('name')!.setValue(v, { emitEvent: false });
      }
    });
  }

  loadSupplierDetails(): void {
    const idParam = this.route?.snapshot?.paramMap?.get('id');
    this.id = idParam ? Number(idParam) : 1;
    this.api.getSupplierById(this.id).subscribe((s: any) => {
      const supplierName = s?.supplierName ?? s?.name ?? '';
      this.supplierForm.patchValue({
        name: supplierName,
        supplierName,
        email: s?.email ?? '',
        phone: s?.phone ?? '',
        address: s?.address ?? '',
        username: s?.username ?? '',
        password: s?.password ?? '',
        role: s?.role ?? 'USER'
      });
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) return;
    const v = this.supplierForm.value;
    const payload = {
      supplierId: this.id,
      supplierName: v.supplierName ?? v.name,
      phone: v.phone,
      address: v.address,
      username: v.username,
      password: v.password,
      role: v.role
    };
    this.api.editSupplier(payload as any).subscribe();
  }
}