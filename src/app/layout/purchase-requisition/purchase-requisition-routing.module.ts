import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRequisitionComponent } from './purchase-requisition.component';
import { PurchaseRequisitionAddComponent } from './purchase-requisition-add/purchase-requisition-add.component';
import { PurchaseRequisitionDeatilsComponent } from './purchase-requisition-deatils/purchase-requisition-deatils.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRequisitionComponent
  },
  {
    path: 'add',
    component: PurchaseRequisitionAddComponent
  }
  ,
  {
    path: 'details/:id',
    component: PurchaseRequisitionDeatilsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequisitionRoutingModule { }
