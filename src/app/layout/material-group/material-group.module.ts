import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialGroupRoutingModule } from './material-group-routing.module';
import { MaterialGroupComponent } from './material-group.component';
import { MaterialGroupAddComponent } from './material-group-add/material-group-add.component';
import { MaterialGroupEditComponent } from './material-group-edit/material-group-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialGroupRoutingModule,
    CoreModule
  ],
  declarations: [MaterialGroupComponent, MaterialGroupAddComponent, MaterialGroupEditComponent]
})
export class MaterialGroupModule { }
