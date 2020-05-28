import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks.component';
import { BanksAddComponent } from './banks-add/banks-add.component';
import { BanksEditComponent } from './banks-edit/banks-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    BanksRoutingModule,
    CoreModule

  ],
  declarations: [BanksComponent, BanksAddComponent, BanksEditComponent],
  providers: []
})
export class BanksModule { }
