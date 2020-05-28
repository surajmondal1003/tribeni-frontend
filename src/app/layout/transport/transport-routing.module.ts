import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { TransportAddComponent } from './transport-add/transport-add.component';
import { TransportEditComponent } from './transport-edit/transport-edit.component';

const routes: Routes = [
  {
  path: '',
  component: TransportComponent
  },
  {
    path: 'add',
    component: TransportAddComponent
  },
  {
    path: 'edit/:id',
    component: TransportEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
