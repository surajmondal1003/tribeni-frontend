import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  companyBranchList = [];
  states;
  companyBranchCompShow;
  companyBranchId;
  defaultPagination: number;
  totalCompanyBranchList: number;
  search_key = '';
  itemNo: number;
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
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Unit",
        code: "branch_name",
        sort_type:''
      },
      {  
        name: "Unit Location",
        code: "branch_address",
        sort_type:''
      },
      {  
        name: "Contact No",
        code: "branch_contact_no",
        sort_type:''
      },
      {  
        name: "Email",
        code: "branch_email",
        sort_type:''
      },
      {  
        name: "GST",
        code: "branch_gstin",
        sort_type:''
      },
      {  
        name: "PAN",
        code: "branch_pan",
        sort_type:''
      },
      {  
        name: "CIN",
        code: "branch_cin",
        sort_type:''
      }
    ];
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.companyBranchCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyBranchList(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.branch.heading;
      this.help_description = res.data.branch.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showBranchAdd() {
    this.companyBranchCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showBranchEdit(id) {
    this.companyBranchId = id;
    this.companyBranchCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadBranchList() {
    this.companyBranchCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyBranchList(this.route.snapshot.params['id']);
  }

  getCompanyBranchList(id) {
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
    this.companyService.getCompanyBranchList(id,params).subscribe(
      (data: any[]) => {
        this.totalCompanyBranchList = data['count'];
        this.companyBranchList = data['results'];

        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalCompanyBranchList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalCompanyBranchList
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
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getCompanyBranchList(this.route.snapshot.params['id']);
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getCompanyBranchList(this.route.snapshot.params['id']);
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
    this.getCompanyBranchList(this.route.snapshot.params['id']);
  };

}
