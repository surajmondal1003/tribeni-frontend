import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from './stocks.component';
import { StocksIssueComponent } from './stocks-issue/stocks-issue.component';
import { StocksIssueHistoryComponent } from './stocks-issue-history/stocks-issue-history.component';

const routes: Routes = [
  {
    path: '',
    component: StocksComponent
  },
  {
    path: 'issue/:id',
    component: StocksIssueComponent
  },
  {
    path: 'issue-history/:id',
    component: StocksIssueHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
