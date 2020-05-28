import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksTransferRoutingModule } from './stocks-transfer-routing.module';
import { StocksTransferComponent } from './stocks-transfer.component';
import { StocksTransferAddComponent } from './stocks-transfer-add/stocks-transfer-add.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    StocksTransferRoutingModule,
    CoreModule
  ],
  declarations: [StocksTransferComponent, StocksTransferAddComponent]
})
export class StocksTransferModule { }
