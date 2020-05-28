import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { CompanyService } from '../../../core/services/company.service';
import { ReportsService } from '../../../core/services/reports.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-reports-purchase-requisition',
  templateUrl: './reports-purchase-requisition.component.html',
  styleUrls: ['./reports-purchase-requisition.component.scss']
})
export class ReportsPurchaseRequisitionComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  requisition_list: any[] = [];
  company_list: any[] = [];
  project_list: any[] = [];
  vendor_list: any[] = [];
  defaultPagination: number;
  SearchRequisitionList: any[] = [];
  totalSearchRequisitionList: number;
  Search_requisition_list_key: boolean;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  requisitionDetails: any;
  requisition_details_key: boolean;
  company: number;
  project: number;
  status = '';
  approve = '';
  requisition_date: any;
  from_date: any;
  to_date: any;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private companyService: CompanyService,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getRequisitionList();
    this.getCompanyList();
    this.getCompanyProjectList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employeeAdd.heading;
      this.help_description = res.data.employeeAdd.desc;
    })
  }

  getRequisitionList() {
    this.purchaseRequisitionService.getPurchaseRequisitionListWithoutPagination().subscribe(
      res => {
        this.requisition_list = res;
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

  requisitionChange(id) {
    if (id) {
      this.loading = LoadingState.Processing;
      this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(res => {
        this.requisitionDetails = res;
        // console.log(this.requisitionDetails)
        this.requisition_details_key = true;
        this.Search_requisition_list_key = false;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.requisition_details_key = false;
      this.getSearchRequisitionList();
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

  search() {
    this.getSearchRequisitionList();
  }

  pagination() {
    this.getSearchRequisitionList();
  }

  dConvert(n) {
    return n < 10 ? "0"+n : n;
  }

  getSearchRequisitionList() {
    this.Search_requisition_list_key = true;    
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

    if (this.from_date != undefined && this.to_date != undefined) {
      var FrDate = new Date(this.from_date.year, this.from_date.month - 1, this.from_date.day)
      params.set('from_date', FrDate.getFullYear()+"-"+this.dConvert(FrDate.getMonth()+1)+"-"+this.dConvert(FrDate.getDate()));
      var ToDate = new Date(this.to_date.year, this.to_date.month - 1, this.to_date.day)
      params.set('to_date', ToDate.getFullYear()+"-"+this.dConvert(ToDate.getMonth()+1)+"-"+this.dConvert(ToDate.getDate()));
      this.requisition_date = ""
    }

    else if (this.requisition_date != undefined) {
      var RqDate = new Date(this.requisition_date.year, this.requisition_date.month - 1, this.requisition_date.day)
      params.set('created_at', RqDate.getFullYear()+"-"+this.dConvert(RqDate.getMonth()+1)+"-"+this.dConvert(RqDate.getDate()));
    }

    this.reportsService.getRequisitionReportList(params).subscribe(
      (data: any[]) => {
        this.totalSearchRequisitionList = data['count'];
        this.SearchRequisitionList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalSearchRequisitionList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalSearchRequisitionList
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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('purchase-requisition-report-list').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>purchase Requisition Report</title>
          <style>
          .table {
            width: 100%;
            max-width: 100%;
            background-color: transparent;
            //border: 1px;
            //border-color: #dee2e6;
          }
         
          thead {
            vertical-align: middle;
            border-color: #dee2e6;
          }
          tr {
            vertical-align: middle;
            border-color: #dee2e6;
          }
          th, td {
            border: 1px solid #dee2e6;
          }
          tbody {
            vertical-align: middle;
            border-color: #dee2e6;
          }
          
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
