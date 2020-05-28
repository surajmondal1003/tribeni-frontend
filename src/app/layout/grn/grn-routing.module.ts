import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrnComponent } from './grn.component';
import { GrnAddComponent } from './grn-add/grn-add.component';
import { GrnDetailsComponent } from './grn-details/grn-details.component';

const routes: Routes = [
  {
  path: '',
  component: GrnComponent
  },
  {
    path: 'add',
    component: GrnAddComponent
  },
  {
    path: 'details/:id',
    component: GrnDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
