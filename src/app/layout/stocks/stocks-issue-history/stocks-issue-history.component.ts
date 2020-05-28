import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StocksService } from '../../../core/services/stocks.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-stocks-issue-history',
  templateUrl: './stocks-issue-history.component.html',
  styleUrls: ['./stocks-issue-history.component.scss']
})
export class StocksIssueHistoryComponent implements OnInit {

  stockIssueList = [];
  itemNo: number;
  defaultPagination: number;
  totalStockIssueList: number;
  search_key = '';
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getStockIssueList();
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stockIssueHistory.heading;
      this.help_description = res.data.stockIssueHistory.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getStockIssueList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStockIssueList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.stocksService.getStockIssueHistoryList(params,this.route.snapshot.params['id']).subscribe(res => {      
      this.totalStockIssueList = res['count'];
      this.stockIssueList = res['results'];
      this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
      this.lower_count = this.itemNo + 1;
      if(this.totalStockIssueList > this.itemPerPage*this.defaultPagination){
        this.upper_count = this.itemPerPage*this.defaultPagination
      }
      else{
        this.upper_count = this.totalStockIssueList
      }
      this.loading = LoadingState.Ready;
      console.log(this.stockIssueList)
    },
    error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }

  pagination() {
    this.itemNo = (this.defaultPagination - 1) * 10;
    this.loading = LoadingState.Processing;
    this.getStockIssueList();
  };

}
