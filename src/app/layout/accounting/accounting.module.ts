import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { PayComponent } from './pay/pay.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';

// core
import {CoreModule} from "../../core/core.module";



@NgModule({
  imports: [
    CommonModule,
    AccountingRoutingModule,
    CoreModule
  ],
  declarations: [PayComponent, AccountingComponent, PaymentReportsComponent]
})
export class AccountingModule { }
