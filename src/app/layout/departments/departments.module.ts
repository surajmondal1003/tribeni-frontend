import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsAddComponent } from './departments-add/departments-add.component';
import { DepartmentsEditComponent } from './departments-edit/departments-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    CoreModule
  ],
  declarations: [DepartmentsComponent, DepartmentsAddComponent, DepartmentsEditComponent]
})
export class DepartmentsModule { }
