import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeesAddComponent } from './employees-add/employees-add.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';

import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeAttendanceAddComponent } from './employee-attendance-add/employee-attendance-add.component';
import { EmployeeAttendanceEditComponent } from './employee-attendance-edit/employee-attendance-edit.component';
import { ModuleActivatePermissionComponent } from './module-activate-permission/module-activate-permission.component';
import { ModuleActivatePermissionAddComponent } from './module-activate-permission-add/module-activate-permission-add.component';
import { ModuleActivatePermissionEditComponent } from './module-activate-permission-edit/module-activate-permission-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: 'add',
    component: EmployeesAddComponent
  },
  {
    path: 'edit/:id',
    component: EmployeesEditComponent
  },
  {
    path: 'attendance',
    component: EmployeeAttendanceComponent
  },
  {
    path: 'attendance/add',
    component: EmployeeAttendanceAddComponent
  },
  {
    path: 'attendance/edit/:id',
    component: EmployeeAttendanceEditComponent
  },
  {
    path: 'module-activate-permission',
    component: ModuleActivatePermissionComponent
  },
  {
    path: 'module-activate-permission/add',
    component: ModuleActivatePermissionAddComponent
  },
  {
    path: 'module-activate-permission/edit/:id',
    component: ModuleActivatePermissionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
