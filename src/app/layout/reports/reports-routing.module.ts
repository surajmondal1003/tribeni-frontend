import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsGrnComponent } from './reports-grn/reports-grn.component';
import { ReportsPurchaseOrderComponent } from './reports-purchase-order/reports-purchase-order.component';
import { ReportsPurchaseRequisitionComponent } from './reports-purchase-requisition/reports-purchase-requisition.component';

const routes: Routes = [
  {
    path: 'purchase-requisition',
    component: ReportsPurchaseRequisitionComponent
    },
    {
      path: 'purchase-order',
      component: ReportsPurchaseOrderComponent
    },
    {
      path: 'grn',
      component: ReportsGrnComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
