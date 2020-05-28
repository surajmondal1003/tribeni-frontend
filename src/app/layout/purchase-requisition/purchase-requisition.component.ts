import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../core/services/company.service';
import { PurchaseRequisitionService } from '../../core/services/purchase-requisition.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.scss']
})
export class PurchaseRequisitionComponent implements OnInit {
  purchaseRequisitionList: any = [];
  companyList: any = [];
  projectList: any = [];
  user_approve_details: any = [];
  module = "requisition";
  defaultPagination: number;
  totalPurchaseRequisitionList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  project_id: '';
  company_id: '';
  sort_by = '';
  sort_type = '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private companyService: CompanyService,
    private toastr: ToastrService,
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
        code: "project__project_name",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "PR No.",
        code: "requisition_no",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Number'
      },
      {
        name: "PR Raised Date",
        code: "created_at",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Raised Date'
      },
      {
        name: "PR Raised By",
        code: "created_by__first_name",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Raised By'
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));

    this.getPurchaseRequisitionList();
    this.getHelp();
    this.getCompanyList();
    this.getProjectList();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisition.heading;
      this.help_description = res.data.purchaseRequisition.desc;
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

  getPurchaseRequisitionList() {
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
    this.purchaseRequisitionService.getPurchaseRequisitionList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseRequisitionList = data['count'];
        this.purchaseRequisitionList = data['results'];
        for(let i=0;i<this.purchaseRequisitionList.length;i++)
        {
          this.purchaseRequisitionList[i].isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.purchaseRequisitionList[i].approval_level)[0];
        }
        

        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalPurchaseRequisitionList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalPurchaseRequisitionList
        }
        this.loading = LoadingState.Ready;
        // console.log(this.purchaseRequisitionList)
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  changeApproveStatus(value, id,approval_level) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let purchaseRequisition;

      if(value==2)
      {
        purchaseRequisition = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        purchaseRequisition = {
          id: id,
          approval_level:approval_level+1
        };
      }

      this.purchaseRequisitionService.changeApproveStatusPurchaseRequisition(purchaseRequisition).subscribe(
        response => {
          this.toastr.success('Purchase Requisition approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseRequisitionList();
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

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseRequisitionList();
  }
  pagination() {
    this.loading = LoadingState.Processing;
    this.getPurchaseRequisitionList();
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
    this.getPurchaseRequisitionList();
  };

}
