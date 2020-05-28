import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequisitionRoutingModule } from './purchase-requisition-routing.module';
import { PurchaseRequisitionComponent } from './purchase-requisition.component';
import { PurchaseRequisitionAddComponent } from './purchase-requisition-add/purchase-requisition-add.component';
import { PurchaseRequisitionDeatilsComponent } from './purchase-requisition-deatils/purchase-requisition-deatils.component';



// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    PurchaseRequisitionRoutingModule,
    CoreModule
  ],
  declarations: [PurchaseRequisitionComponent, PurchaseRequisitionAddComponent, PurchaseRequisitionDeatilsComponent],
  providers: []
})
export class PurchaseRequisitionModule { }
