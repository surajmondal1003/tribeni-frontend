import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { PayComponent } from './pay/pay.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent
  },
  {
    path: 'pay/:id',
    component: PayComponent
  },
  {
    path: 'payment-reports',
    component: PaymentReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
