import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { PaymentService } from '../../../core/services/payment.service';
import { CompanyService } from '../../../core/services/company.service';
import { VendorService } from '../../../core/services/vendor.service';
import { ReportsService } from '../../../core/services/reports.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss']
})
export class PaymentReportsComponent implements OnInit {

  form: FormGroup;
  help_heading = "";
  help_description = "";
  payment_list: any[] = [];
  company_list: any[] = [];
  project_list: any[] = [];
  vendor_list: any[] = [];
  defaultPagination: number;
  SearchPaymentList: any[] = [];
  totalSearchPaymentList: number;
  Search_payment_list_key: boolean;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  paymentDetails: any;
  payment_details_key: boolean;
  company: number;
  project: number;
  vendor: number;
  paid = '';
  from_date: any;
  to_date: any;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private companyService: CompanyService,
    private vendorService: VendorService,
    private reportsService: ReportsService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPaymentList();
    this.getCompanyList();
    this.getCompanyProjectList();
    this.getVendorList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.paymentReport.heading;
      this.help_description = res.data.paymentReport.desc;
    })
  }

  getPaymentList() {
    this.paymentService.getPaymentListWithoutPagination().subscribe(
      res => {
        this.payment_list = res;
        // console.log(res)
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

  paymentChange(id) {
    if (id) {
      this.loading = LoadingState.Processing;
      this.paymentService.getPaymentInfoDetails(id).subscribe(res => {
        this.paymentDetails = res;
        // console.log(this.paymentDetails)
        this.payment_details_key = true;
        this.Search_payment_list_key = false;
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
      this.payment_details_key = false;
      this.getSearchPaymentList();
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
    this.getSearchPaymentList();
  }

  pagination() {
    this.getSearchPaymentList();
  }

  dConvert(n) {
    return n < 10 ? "0"+n : n;
  }

  getSearchPaymentList() {
    this.Search_payment_list_key = true;
    this.loading = LoadingState.Processing;
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.company > 0) {
      params.set('company', this.company.toString());
    }
    if (this.project > 0) {
      params.set('project', this.project.toString());
    }
    if (this.paid != "") {
      params.set('paid', this.paid.toString());
    }
    if (this.vendor > 0) {
      params.set('vendor', this.vendor.toString());
    }    

    if (this.from_date != undefined && this.to_date != undefined) {
      var FrDate = new Date(this.from_date.year, this.from_date.month - 1, this.from_date.day)
      params.set('from_date', FrDate.getFullYear()+"-"+this.dConvert(FrDate.getMonth()+1)+"-"+this.dConvert(FrDate.getDate()));
      var ToDate = new Date(this.to_date.year, this.to_date.month - 1, this.to_date.day)
      params.set('to_date', ToDate.getFullYear()+"-"+this.dConvert(ToDate.getMonth()+1)+"-"+this.dConvert(ToDate.getDate()));
    }

    this.reportsService.getPaymentReportList(params).subscribe(
      (data: any[]) => {
        this.totalSearchPaymentList = data['count'];
        this.SearchPaymentList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalSearchPaymentList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalSearchPaymentList
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

}
