import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationsComponent } from './designations.component';
import { DesignationsAddComponent } from './designations-add/designations-add.component';
import { DesignationsEditComponent } from './designations-edit/designations-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DesignationsComponent
  },
  {
    path: 'add',
    component: DesignationsAddComponent
  },
  {
    path: 'edit/:id',
    component: DesignationsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationsRoutingModule { }
