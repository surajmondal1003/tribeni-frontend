import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
// core
import { CoreModule } from "../core/core.module";


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule,
    NgxPermissionsModule.forChild()    
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
