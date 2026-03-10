import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SupplyLinkRoutingModule } from "./supplylink-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from "./components/product/product.component";
import { SupplierComponent } from "./components/supplier/supplier.component";
import { WarehouseComponent } from "./components/warehouse/warehouse.component";

@NgModule({
  declarations: [
    ProductComponent,
    SupplierComponent,
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    SupplyLinkRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    
  ]
})
export class SupplyLinkModule {}
