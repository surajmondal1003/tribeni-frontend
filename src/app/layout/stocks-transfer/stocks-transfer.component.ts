import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-stocks-transfer',
  templateUrl: './stocks-transfer.component.html',
  styleUrls: ['./stocks-transfer.component.scss']
})
export class StocksTransferComponent implements OnInit {

  stocksTransferList = [];
  itemNo:number;
  defaultPagination: number;
  totalStocksTransferList: number;
  search_key = '';
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getStocksTransferList();
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStocksTransferList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStocksTransferList(){
    this.spinner.hide();
  }

  pagination() {
    this.itemNo = (this.defaultPagination - 1) * 10;
    this.spinner.show();
    this.getStocksTransferList();
  };

}
