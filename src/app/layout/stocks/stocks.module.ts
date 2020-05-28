import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { StocksIssueComponent } from './stocks-issue/stocks-issue.component';
import { StocksIssueHistoryComponent } from './stocks-issue-history/stocks-issue-history.component';

// core
import {CoreModule} from "../../core/core.module";


@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule,
    CoreModule
  ],
  declarations: [StocksComponent, StocksIssueComponent, StocksIssueHistoryComponent]
})
export class StocksModule { }
