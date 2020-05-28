import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorTypeComponent } from './vendor-type.component';
import { VendorTypeAddComponent } from './vendor-type-add/vendor-type-add.component';
import { VendorTypeEditComponent } from './vendor-type-edit/vendor-type-edit.component';
const routes: Routes = [
  {
    path:'',
    component: VendorTypeComponent
  },
  {
    path:'add',
    component: VendorTypeAddComponent
  },
  {
    path:'edit/:id',
    component: VendorTypeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorTypeRoutingModule { }
