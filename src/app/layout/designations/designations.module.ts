import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationsRoutingModule } from './designations-routing.module';
import { DesignationsComponent } from './designations.component';
import { DesignationsAddComponent } from './designations-add/designations-add.component';
import { DesignationsEditComponent } from './designations-edit/designations-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    DesignationsRoutingModule,
    CoreModule
  ],
  declarations: [DesignationsComponent, DesignationsAddComponent, DesignationsEditComponent]
})
export class DesignationsModule { }
