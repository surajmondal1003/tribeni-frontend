import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TermsConditionRoutingModule } from './terms-condition-routing.module';
import { TermsConditionComponent } from './terms-condition.component';
import { TermsConditionAddComponent } from './terms-condition-add/terms-condition-add.component';
import { TermsConditionEditComponent } from './terms-condition-edit/terms-condition-edit.component';
// core
import { CoreModule } from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    TermsConditionRoutingModule,
    CoreModule,
    NgxPermissionsModule.forChild()
  ],
  declarations: [TermsConditionComponent, TermsConditionAddComponent, TermsConditionEditComponent],
  providers: []
})
export class TermsConditionModule { }
