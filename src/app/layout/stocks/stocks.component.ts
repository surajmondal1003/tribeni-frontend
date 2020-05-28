import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StocksService } from '../../core/services/stocks.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stockList = [];
  itemNo: number;
  defaultPagination: number;
  totalStockList: number;
  search_key = '';
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  sort_by = '';
  sort_type= '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {  
        name: "Company",
        code: "company__company_name",
        sort_type:''
      },
      {  
        name: "Project",
        code: "company_project__project_name",
        sort_type:''
      }, 
      {  
        name: "Material Group",
        code: "material_type__material_type",
        sort_type:''
      },   
      {  
        name: "Material",
        code: "material__material_fullname",
        sort_type:''
      },
      {  
        name: "Available Qty",
        code: "quantity",
        sort_type:''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getStockList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stock.heading;
      this.help_description = res.data.stock.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getStockList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStockList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if(this.search_key !='')
    {
      params.set('search', this.search_key.toString());
    }
    if(this.sort_by !='')
    {
      params.set('field_name', this.sort_by.toString());
    }

    if(this.sort_type !='')
    {
      params.set('order_by', this.sort_type.toString());
    }
    this.stocksService.getStockList(params).subscribe(res => {
      this.totalStockList = res['count'];
      this.stockList = res['results'];
      this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
      this.lower_count = this.itemNo + 1;
      if (this.totalStockList > this.itemPerPage * this.defaultPagination) {
        this.upper_count = this.itemPerPage * this.defaultPagination
      }
      else {
        this.upper_count = this.totalStockList
      }
      this.loading = LoadingState.Ready;
      // console.log(this.stockList)
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
    this.getStockList();
  };

  sortTable(value)
  {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if(optionValue.code == value)
      {
        if(optionValue.sort_type =='desc')
        {
          type = 'asc';
        }
        else
        {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else{
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getStockList();
  };
}
