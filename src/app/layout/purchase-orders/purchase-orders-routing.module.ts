import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersAddComponent } from './purchase-orders-add/purchase-orders-add.component';
import { PurchaseOrdersDetailsComponent } from './purchase-orders-details/purchase-orders-details.component';
const routes: Routes = [
  {
    path: '',
    component: PurchaseOrdersComponent
  },
  {
    path: 'add',
    component: PurchaseOrdersAddComponent
  },
  {
    path: 'details/:id',
    component: PurchaseOrdersDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule { }
