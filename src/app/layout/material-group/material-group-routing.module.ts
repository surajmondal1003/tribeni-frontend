import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialGroupComponent } from './material-group.component';
import { MaterialGroupAddComponent } from './material-group-add/material-group-add.component';
import { MaterialGroupEditComponent } from './material-group-edit/material-group-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialGroupComponent
  },
  {
    path: 'add',
    component: MaterialGroupAddComponent
  },
  {
    path: 'edit/:id',
    component: MaterialGroupEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialGroupRoutingModule { }
