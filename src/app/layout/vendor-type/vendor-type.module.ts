import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorTypeRoutingModule } from './vendor-type-routing.module';
import { VendorTypeComponent } from './vendor-type.component';
import { VendorTypeAddComponent } from './vendor-type-add/vendor-type-add.component';
import { VendorTypeEditComponent } from './vendor-type-edit/vendor-type-edit.component';

import {CoreModule} from "../../core/core.module";
@NgModule({
  imports: [
    CommonModule,
    VendorTypeRoutingModule,
    CoreModule
  ],
  declarations: [VendorTypeComponent, VendorTypeAddComponent, VendorTypeEditComponent],
  providers: []
})
export class VendorTypeModule { }
