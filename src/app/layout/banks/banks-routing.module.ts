import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component';
import { BanksAddComponent } from './banks-add/banks-add.component';
import { BanksEditComponent } from './banks-edit/banks-edit.component';

const routes: Routes = [
  {
  path: '',
  component: BanksComponent
  },
  {
    path: 'add',
    component: BanksAddComponent
  },
  {
    path: 'edit/:id',
    component: BanksEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
