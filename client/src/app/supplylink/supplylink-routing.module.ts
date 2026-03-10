// import { NgModule } from "@angular/core";
// import { RouterModule, Routes } from "@angular/router";
// import { DashboardComponent } from "./components/dashboard/dashboard.component";
// import { SupplierComponent } from "./components/supplier/supplier.component";
// import { WarehouseComponent } from "./components/warehouse/warehouse.component";
// import { ProductComponent } from "./components/product/product.component";
// // import { SupplierEditComponent } from "./components/supplieredit/supplieredit.component";
// // import { WarehouseEditComponent } from "./components/warehouseedit/warehouseedit.component";


// const routes: Routes = [
  
// { path: '', component: DashboardComponent },
//   { path: 'suppliers', component: SupplierComponent },
//   { path: 'warehouses', component: WarehouseComponent },
//   { path: 'products', component: ProductComponent },
//   // { path: 'suppliers/:id/edit', component: SupplierEditComponent },
//   // { path: 'warehouses/:id/edit', component: WarehouseEditComponent }

// ];

// @NgModule({
//   declarations: [
//     DashboardComponent,
//     SupplierComponent,
//     WarehouseComponent,
//     ProductComponent,
//     // SupplierEditComponent,
//     // WarehouseEditComponent
//   ],
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class SupplyLinkRoutingModule {}


// src/app/supplylink/supplylink-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SupplierComponent } from "./components/supplier/supplier.component";
import { WarehouseComponent } from "./components/warehouse/warehouse.component";
import { ProductComponent } from "./components/product/product.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "suppliers", component: SupplierComponent },
  { path: "warehouses", component: WarehouseComponent },
  { path: "products", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyLinkRoutingModule {}