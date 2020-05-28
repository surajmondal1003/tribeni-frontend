import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpensesAddComponent } from './expenses-add/expenses-add.component';
import { ExpensesDetailComponent } from './expenses-detail/expenses-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent
  },
  {
    path: 'add',
    component: ExpensesAddComponent
  },
  {
    path: 'detail/:id',
    component: ExpensesDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
