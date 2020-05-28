import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UomComponent } from './uom.component';
import { UomAddComponent } from './uom-add/uom-add.component';
import { UomEditComponent } from './uom-edit/uom-edit.component';

const routes: Routes = [
  {
    path:'',
    component: UomComponent
  },
  {
    path:'add',
    component: UomAddComponent
  },
  {
    path:'edit/:id',
    component: UomEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomRoutingModule { }
