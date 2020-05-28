import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomRoutingModule } from './uom-routing.module';
import { UomComponent } from './uom.component';
import { UomAddComponent } from './uom-add/uom-add.component';
import { UomEditComponent } from './uom-edit/uom-edit.component';

import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    UomRoutingModule,
    CoreModule
  ],
  declarations: [UomComponent, UomAddComponent, UomEditComponent]
})
export class UomModule { }
