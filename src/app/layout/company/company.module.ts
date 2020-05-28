import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyTreeComponent } from './company-tree/company-tree.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchAddComponent } from './branch-add/branch-add.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { StorageLocationListComponent } from './storage-location-list/storage-location-list.component';
import { StorageLocationAddComponent } from './storage-location-add/storage-location-add.component';
import { StorageLocationEditComponent } from './storage-location-edit/storage-location-edit.component';

// core
import {CoreModule} from "../../core/core.module";
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CoreModule
  
  ],
  declarations: [
    CompanyComponent,
    CompanyTreeComponent, 
    CompanyAddComponent, 
    CompanyDetailsComponent, 
    CompanyEditComponent, 
    BranchListComponent, 
    BranchAddComponent, 
    BranchEditComponent, 
    StorageLocationListComponent, 
    StorageLocationAddComponent, 
    StorageLocationEditComponent, ProjectListComponent, ProjectAddComponent, ProjectEditComponent, ProjectDetailsComponent
  ],
  providers: []
})
export class CompanyModule { }
