import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { GrnService } from '../../../core/services/grn.service';
import { CompanyService } from '../../../core/services/company.service';
import { VendorService } from '../../../core/services/vendor.service';
import { ReportsService } from '../../../core/services/reports.service';
import * as Globals from '../../../core/globals';
import * as jsPDF from 'jspdf';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-reports-grn',
  templateUrl: './reports-grn.component.html',
  styleUrls: ['./reports-grn.component.scss']
})
export class ReportsGrnComponent implements OnInit {

  form: FormGroup;
  help_heading = "";
  help_description = "";
  grn_list: any[] = [];
  company_list: any[] = [];
  vendor_list: any[] = [];
  project_list: any[] = [];
  defaultPagination: number;
  SearchGrnList: any[] = [];
  material_details_list: any[] = [];
  totalSearchGrnList: number;
  Search_grn_list_key: boolean;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  grnDetails: any;
  grn_details_key: boolean;
  company: number;
  project: number;
  vendor: number;
  status = '';
  approve = '';
  grn_date: any;
  from_date: any;
  to_date: any;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private grnService: GrnService,
    private companyService: CompanyService,
    private vendorService: VendorService,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getGrnList();
    this.getCompanyList();
    this.getCompanyProjectList();
    this.getVendorList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employeeAdd.heading;
      this.help_description = res.data.employeeAdd.desc;
    })
  }

  getGrnList() {
    this.grnService.getGrnListWithoutPagination().subscribe(
      res => {
        this.grn_list = res;
        // console.log(res)
        this.loading = LoadingState.Ready;
      },
      error => {
        console.log('error', error)
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  grnChange(id) {
    if (id) {
      this.loading = LoadingState.Processing;
      this.grnDetails = '';
      this.material_details_list = [];
      this.grnService.getGrnDetails(id).subscribe(res => {
        this.grnDetails = res;
        this.grnDetails.grn_detail.forEach(x => {
          var PoDetails = this.grnDetails.po_order.purchase_order_detail.filter(p => p.material.id === x.material.id)[0]
          if (PoDetails != undefined) {
            var material_value = Math.round(Math.round(PoDetails.rate) * Math.round(x.receive_quantity));
            var discount_amount = (material_value * PoDetails.discount_percent) / 100;
            var total_gst = (material_value * Math.round(PoDetails.igst)) / 100;
            var material_amount_pay = material_value - discount_amount + total_gst;
            var Mdtl = {
              material: x.material.id,
              rate: Math.round(PoDetails.rate),
              quantity: Math.round(x.receive_quantity),
              discount_per: Math.round(PoDetails.discount_percent),
              discount_amount: discount_amount,
              igst: Math.round(PoDetails.igst),
              cgst: Math.round(PoDetails.cgst),
              sgst: Math.round(PoDetails.sgst),
              total_gst: total_gst,
              material_value: material_value,
              material_amount_pay: material_amount_pay
            }
            this.material_details_list.push(Mdtl)
          }
        })
        this.grn_details_key = true;
        this.Search_grn_list_key = false;
        this.loading = LoadingState.Ready;
      })

    }
    else {
      this.material_details_list = [];
      this.grn_details_key = false;
      this.getSearchGrnList();
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
    this.getSearchGrnList();
  }

  pagination() {
    this.getSearchGrnList();
  }

  dConvert(n) {
    return n < 10 ? "0" + n : n;
  }

  getSearchGrnList() {
    this.Search_grn_list_key = true;
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
      params.set('from_date', FrDate.getFullYear() + "-" + this.dConvert(FrDate.getMonth() + 1) + "-" + this.dConvert(FrDate.getDate()));
      var ToDate = new Date(this.to_date.year, this.to_date.month - 1, this.to_date.day)
      params.set('to_date', ToDate.getFullYear() + "-" + this.dConvert(ToDate.getMonth() + 1) + "-" + this.dConvert(ToDate.getDate()));
      this.grn_date = ""
    }

    else if (this.grn_date != undefined) {
      var PoDate = new Date(this.grn_date.year, this.grn_date.month - 1, this.grn_date.day)
      params.set('created_at', PoDate.getFullYear() + "-" + this.dConvert(PoDate.getMonth() + 1) + "-" + this.dConvert(PoDate.getDate()));
    }

    this.reportsService.getGrnReportList(params).subscribe(
      (data: any[]) => {
        this.totalSearchGrnList = data['count'];
        this.SearchGrnList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalSearchGrnList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalSearchGrnList
        }
        this.loading = LoadingState.Ready;
        // console.log(data)
      },
      error => {
        console.log('error', error)
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };


  // pdf
  generatePdf(id: string) {
    const elementToPrint = document.getElementById(id);
    var options = {
      background: '#FFFFFF',
      pagesplit: true
    };
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.internal.scaleFactor = 2.10;
    pdf.addHTML(elementToPrint, 0, 0, options, () => {
      pdf.save('web.pdf');
    });
  }

}
