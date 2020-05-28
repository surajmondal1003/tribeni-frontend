import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReverseGrnComponent } from './reverse-grn.component';
import { ReverseGrnAddComponent } from './reverse-grn-add/reverse-grn-add.component';
import { ReverseGrnDetailsComponent } from './reverse-grn-details/reverse-grn-details.component';
const routes: Routes = [
  {
    path: '',
    component: ReverseGrnComponent
  },
  {
    path: 'add',
    component: ReverseGrnAddComponent
  },
  {
    path: 'details/:id',
    component: ReverseGrnDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReverseGrnRoutingModule { }
