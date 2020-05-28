import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GstRatesRoutingModule } from './gst-rates-routing.module';
import { GstRatesComponent } from './gst-rates.component';
import { GstRatesAddComponent } from './gst-rates-add/gst-rates-add.component';
import { GstRatesEditComponent } from './gst-rates-edit/gst-rates-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    GstRatesRoutingModule,
    CoreModule
  ],
  declarations: [GstRatesComponent, GstRatesAddComponent, GstRatesEditComponent],
  providers: []
})
export class GstRatesModule { }
