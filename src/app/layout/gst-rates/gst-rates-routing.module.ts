import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstRatesComponent } from './gst-rates.component';
import { GstRatesAddComponent } from './gst-rates-add/gst-rates-add.component';
import { GstRatesEditComponent } from './gst-rates-edit/gst-rates-edit.component';

const routes: Routes = [
  {
  path: '',
  component: GstRatesComponent
  },
  {
    path: 'add',
    component: GstRatesAddComponent
  },
  {
    path: 'edit/:id',
    component: GstRatesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstRatesRoutingModule { }
