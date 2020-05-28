import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionComponent } from './terms-condition.component';
import { TermsConditionAddComponent } from './terms-condition-add/terms-condition-add.component';
import { TermsConditionEditComponent } from './terms-condition-edit/terms-condition-edit.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
const routes: Routes = [
  {
    path: '',
    component: TermsConditionComponent
  },
  {
    path: 'add',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin'],
        redirectTo: '/terms-condition'
      }
    },
    component: TermsConditionAddComponent
  },
  {
    path: 'edit/:id',
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ['Admin'],
    //     redirectTo: '/terms-condition'
    //   }
    // },
    component: TermsConditionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionRoutingModule { }
