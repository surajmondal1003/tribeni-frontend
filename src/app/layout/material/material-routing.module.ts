import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialAddComponent } from './material-add/material-add.component';
import { MaterialEditComponent } from './material-edit/material-edit.component';
import { MaterialComponent } from './material.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent
  },
  {
    path: 'add',
    component: MaterialAddComponent
  },
  {
    path: 'edit/:id',
    component: MaterialEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
