


// src/app/supplylink/supplylink.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { SupplyLinkRoutingModule } from "./supplylink-routing.module";
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SupplierComponent } from "./components/supplier/supplier.component";
import { WarehouseComponent } from "./components/warehouse/warehouse.component";
import { ProductComponent } from "./components/product/product.component";
import { SupplierEditComponent } from "./components/supplieredit/supplieredit.component";
import { WarehouseEditComponent } from "./components/warehouseedit/warehouseedit.component";

@NgModule({
  declarations: [
    DashboardComponent,
    SupplierComponent,
    WarehouseComponent,
    ProductComponent,
    SupplierEditComponent,
    WarehouseEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    SupplyLinkRoutingModule
  ]
})
export class SupplyLinkModule {}