import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesAddComponent } from './employees-add/employees-add.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';

import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeAttendanceAddComponent } from './employee-attendance-add/employee-attendance-add.component';
import { EmployeeAttendanceEditComponent } from './employee-attendance-edit/employee-attendance-edit.component';
import { ModuleActivatePermissionComponent } from './module-activate-permission/module-activate-permission.component';
import { ModuleActivatePermissionAddComponent } from './module-activate-permission-add/module-activate-permission-add.component';
import { ModuleActivatePermissionEditComponent } from './module-activate-permission-edit/module-activate-permission-edit.component';

// core
import {CoreModule} from "../../core/core.module";


@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    CoreModule
  ],
  declarations: [EmployeesComponent, EmployeesAddComponent, EmployeesEditComponent, EmployeeAttendanceComponent, EmployeeAttendanceAddComponent, EmployeeAttendanceEditComponent, ModuleActivatePermissionComponent, ModuleActivatePermissionAddComponent, ModuleActivatePermissionEditComponent]
})
export class EmployeesModule { }
