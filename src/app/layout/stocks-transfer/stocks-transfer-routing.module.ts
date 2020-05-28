import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksTransferComponent } from './stocks-transfer.component';
import { StocksTransferAddComponent } from './stocks-transfer-add/stocks-transfer-add.component';
const routes: Routes = [
  {
    path: '',
    component: StocksTransferComponent
  },
  {
    path: 'add',
    component: StocksTransferAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksTransferRoutingModule { }
