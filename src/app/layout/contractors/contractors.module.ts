import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorsRoutingModule } from './contractors-routing.module';
import { ContractorsComponent } from './contractors.component';
import { ContractorsAddComponent } from './contractors-add/contractors-add.component';
import { ContractorsEditComponent } from './contractors-edit/contractors-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ContractorsRoutingModule,
    CoreModule
  ],
  declarations: [ContractorsComponent, ContractorsAddComponent, ContractorsEditComponent]
})
export class ContractorsModule { }
