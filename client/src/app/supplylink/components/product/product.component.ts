// src/app/supplylink/components/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

class Product {
  constructor(
    public productId: number,
    public warehouseId: number,
    public productName: string,
    public productDescription: string,
    public quantity: number,
    public price: number
  ) {}
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  createdProduct: Product | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: [0],
      warehouseId: [null, [Validators.required, Validators.min(1)]],
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      productDescription: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) return;
    const v = this.productForm.value;
    this.createdProduct = new Product(
      v.productId ?? 0,
      v.warehouseId,
      v.productName,
      v.productDescription ?? '',
      v.quantity,
      v.price
    );
  }
}