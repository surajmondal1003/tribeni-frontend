import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatesComponent } from './states.component';
import { StatesAddComponent } from './states-add/states-add.component';
import { StatesEditComponent } from './states-edit/states-edit.component';

const routes: Routes = [
  {
  path: '',
  component: StatesComponent
  },
  {
    path: 'add',
    component: StatesAddComponent
  },
  {
    path: 'edit/:id',
    component: StatesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
