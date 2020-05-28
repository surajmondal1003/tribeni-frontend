import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseInvoiceComponent } from './purchase-invoice.component';
import { PurchaseInvoiceAddComponent } from './purchase-invoice-add/purchase-invoice-add.component';
import { PurchaseInvoiceDetailsComponent } from './purchase-invoice-details/purchase-invoice-details.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseInvoiceComponent
  },
  {
    path: 'add',
    component: PurchaseInvoiceAddComponent
  },
  {
    path: 'details/:id',
    component: PurchaseInvoiceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInvoiceRoutingModule { }
