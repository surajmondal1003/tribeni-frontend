import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialRoutingModule } from './material-routing.module';

import { MaterialAddComponent } from './material-add/material-add.component';
import { MaterialEditComponent } from './material-edit/material-edit.component';
import { MaterialComponent } from './material.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialRoutingModule,
    CoreModule
 
  ],
  declarations: [MaterialAddComponent, MaterialEditComponent, MaterialComponent],
  providers: []
})
export class MaterialModule { }
