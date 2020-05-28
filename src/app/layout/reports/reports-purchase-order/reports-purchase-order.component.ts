import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { CompanyService } from '../../../core/services/company.service';
import { VendorService } from '../../../core/services/vendor.service';
import { ReportsService } from '../../../core/services/reports.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-reports-purchase-order',
  templateUrl: './reports-purchase-order.component.html',
  styleUrls: ['./reports-purchase-order.component.scss']
})
export class ReportsPurchaseOrderComponent implements OnInit {

  form: FormGroup;
  help_heading = "";
  help_description = "";
  order_list: any[] = [];
  company_list: any[] = [];
  vendor_list: any[] = [];
  project_list: any[] = [];
  defaultPagination: number;
  SearchOrderList: any[] = [];
  totalSearchOrderList: number;
  Search_order_list_key: boolean;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  orderDetails: any;
  order_details_key: boolean;
  company: number;
  project: number;
  vendor: number;
  status = '';
  approve = '';
  order_date: any;
  from_date: any;
  to_date: any;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private purchaseOrdersService: PurchaseOrdersService,
    private companyService: CompanyService,
    private vendorService: VendorService,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getOrderList();
    this.getCompanyList();
    this.getVendorList();
    this.getCompanyProjectList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employeeAdd.heading;
      this.help_description = res.data.employeeAdd.desc;
    })
  }

  getOrderList() {
    this.purchaseOrdersService.getPurchaseOrderListWithoutPagination().subscribe(
      res => {
        this.order_list = res;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  orderChange(id) {
    if (id) {
      this.loading = LoadingState.Processing;
      this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(res => {
        this.orderDetails = res;
        // console.log(this.orderDetails)
        this.order_details_key = true;
        this.Search_order_list_key = false;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
    }
    else {
      this.order_details_key = false;
      this.getSearchOrderList();
    }
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
    })
  }

  getCompanyProjectList() {
    this.companyService.getAllCompanyProjectDropdownList().subscribe(res => {
      this.project_list = res;
    })
  }  

  getVendorList() {
    this.vendorService.getVendorListWithoutPagination().subscribe(res => {
      this.vendor_list = res;
    })
  }

  search() {
    this.getSearchOrderList();
  }

  pagination() {
    this.getSearchOrderList();
  }

  dConvert(n) {
    return n < 10 ? "0"+n : n;
  }

  getSearchOrderList() {
    this.Search_order_list_key = true;
    this.loading = LoadingState.Processing;
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.company > 0) {
      params.set('company', this.company.toString());
    }
    if (this.project > 0) {
      params.set('project', this.project.toString());
    }
    if (this.status != "") {
      params.set('status', this.status.toString());
    }
    if (this.approve != "") {
      params.set('approve', this.approve.toString());
    }
    if (this.vendor > 0) {
      params.set('vendor', this.vendor.toString());
    }    

    if (this.from_date != undefined && this.to_date != undefined) {
      var FrDate = new Date(this.from_date.year, this.from_date.month - 1, this.from_date.day)
      params.set('from_date', FrDate.getFullYear()+"-"+this.dConvert(FrDate.getMonth()+1)+"-"+this.dConvert(FrDate.getDate()));
      var ToDate = new Date(this.to_date.year, this.to_date.month - 1, this.to_date.day)
      params.set('to_date', ToDate.getFullYear()+"-"+this.dConvert(ToDate.getMonth()+1)+"-"+this.dConvert(ToDate.getDate()));
      this.order_date = ""
    }

    else if (this.order_date != undefined) {
      var PoDate = new Date(this.order_date.year, this.order_date.month - 1, this.order_date.day)
      params.set('created_at', PoDate.getFullYear()+"-"+this.dConvert(PoDate.getMonth()+1)+"-"+this.dConvert(PoDate.getDate()));
    }

    this.reportsService.getPurchaseOrderReportList(params).subscribe(
      (data: any[]) => {
        this.totalSearchOrderList = data['count'];
        this.SearchOrderList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalSearchOrderList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalSearchOrderList
        }
        this.loading = LoadingState.Ready;
        // console.log(data)
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  getRequisitionDate(date){
    var PrDate = date.split('/')
    return PrDate[0]
  }

}
