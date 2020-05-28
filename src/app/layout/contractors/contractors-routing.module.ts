import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractorsComponent } from './contractors.component';
import { ContractorsAddComponent } from './contractors-add/contractors-add.component';
import { ContractorsEditComponent } from './contractors-edit/contractors-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorsComponent
    },
    {
      path: 'add',
      component: ContractorsAddComponent
    },
    {
      path: 'edit/:id',
      component: ContractorsEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorsRoutingModule { }
