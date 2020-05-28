import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseInvoiceRoutingModule } from './purchase-invoice-routing.module';
import { PurchaseInvoiceComponent } from './purchase-invoice.component';
import { PurchaseInvoiceAddComponent } from './purchase-invoice-add/purchase-invoice-add.component';
import { PurchaseInvoiceDetailsComponent } from './purchase-invoice-details/purchase-invoice-details.component';

// core
import {CoreModule} from "../../core/core.module";


@NgModule({
  imports: [
    CommonModule,
    PurchaseInvoiceRoutingModule,
    CoreModule
  ],
  declarations: [PurchaseInvoiceComponent, PurchaseInvoiceAddComponent, PurchaseInvoiceDetailsComponent],
  providers: []
})
export class PurchaseInvoiceModule { }
