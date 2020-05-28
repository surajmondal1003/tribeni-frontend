import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesAddComponent } from './expenses-add/expenses-add.component';
import { ExpensesDetailComponent } from './expenses-detail/expenses-detail.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    CoreModule
  ],
  declarations: [ExpensesComponent, ExpensesAddComponent, ExpensesDetailComponent]
})
export class ExpensesModule { }
