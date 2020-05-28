import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsGrnComponent } from './reports-grn/reports-grn.component';
import { ReportsPurchaseOrderComponent } from './reports-purchase-order/reports-purchase-order.component';
import { ReportsPurchaseRequisitionComponent } from './reports-purchase-requisition/reports-purchase-requisition.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CoreModule
  ],
  declarations: [ ReportsGrnComponent, ReportsPurchaseOrderComponent, ReportsPurchaseRequisitionComponent]
})
export class ReportsModule { }
