import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesRoutingModule } from './states-routing.module';
import { StatesComponent } from './states.component';
import { StatesAddComponent } from './states-add/states-add.component';
import { StatesEditComponent } from './states-edit/states-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    StatesRoutingModule,
    CoreModule 
  ],
  declarations: [StatesComponent, StatesAddComponent, StatesEditComponent],
  providers: []
})
export class StatesModule { }
