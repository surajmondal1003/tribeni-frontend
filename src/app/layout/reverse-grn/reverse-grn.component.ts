import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrnService } from '../../core/services/grn.service';
import { GrnReverseService } from '../../core/services/grn-reverse.service';
import { StocksService } from '../../core/services/stocks.service';
import { CompanyService } from '../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-reverse-grn',
  templateUrl: './reverse-grn.component.html',
  styleUrls: ['./reverse-grn.component.scss']
})
export class ReverseGrnComponent implements OnInit {

  grnList: any = [];
  companyList: any = [];
  projectList: any = [];
  defaultPagination: number;
  module = "reversgrn";
  user_approve_details: any = [];
  totalGrnList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  stock: any = []
  project_id: '';
  company_id: '';
  sort_by = '';
  sort_type = '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private grnService: GrnService,
    private grnReverseService: GrnReverseService,
    private stocksService: StocksService,
    private companyService: CompanyService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {
        name: "Company",
        code: "company__company_name",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "Project",
        code: "po_order__requisition__project",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "Reverse GRN. No.",
        code: "revers_gen_no",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "GRN. No.",
        code: "grn__grn_no",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Order Number'
      },
      {
        name: "Vendor",
        code: "grn__vendor__vendor_fullname",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "Vendor Address",
        code: "grn__vendor_address__address",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "Raised Date",
        code: "created_at",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
    ];

    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));
    console.log(this.user_approve_details);
    this.getGrnList();
    this.getHelp();
    this.getCompanyList();
    this.getProjectList();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grn.heading;
      this.help_description = res.data.grn.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(data => {
      this.companyList = data;
    });
  }

  getProjectList() {
    this.companyService.getAllCompanyProjectDropdownList().subscribe(res => {
      this.projectList = res;
    })
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getGrnList();
  }

  getGrnList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }

    if (this.company_id != undefined) {
      params.set('company', this.company_id);
    }

    if (this.project_id != undefined) {
      params.set('project', this.project_id);
    }
    
    if (this.sort_by != '') {
      params.set('field_name', this.sort_by.toString());
    }

    if (this.sort_type != '') {
      params.set('order_by', this.sort_type.toString());
    }
    this.grnReverseService.getReverseGrnList(params).subscribe(
      (data: any[]) => {
        this.totalGrnList = data['count'];
        this.grnList = data['results'];
        console.log(this.grnList)
        for(let i=0;i<this.grnList.length;i++)
        {
          this.grnList[i].isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.grnList[i].approval_level)[0];
        }
        console.log(this.grnList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalGrnList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalGrnList
        }
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  changeApproveStatus(value, id, approval_level) {
    if (value > 0) {

      this.loading = LoadingState.Processing;
      let grn;
      

      if(value==2)
      {
        grn = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        grn = {
          id: id,
          approval_level:approval_level+1
        };
      }
      this.grnReverseService.approveDisapproveReverseGrn(grn).subscribe(
        response => {
         
          this.toastr.success('Reverse Grn approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getGrnList();
        },
        error => {
          this.loading = LoadingState.Ready;
          if(error.error.message)
          {
            this.toastr.error(error.error.message, '', {
              timeOut: 3000,
            });
          }
          else{
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }
        }
      );
    }

  }  

  pagination() {
    this.loading = LoadingState.Processing;
    this.getGrnList();
  };

  sortTable(value) {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if (optionValue.code == value) {
        if (optionValue.sort_type == 'desc') {
          type = 'asc';
        }
        else {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else {
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getGrnList();
  };

}
