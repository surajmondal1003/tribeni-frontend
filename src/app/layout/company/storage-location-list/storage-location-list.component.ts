import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-storage-location-list',
  templateUrl: './storage-location-list.component.html',
  styleUrls: ['./storage-location-list.component.scss']
})
export class StorageLocationListComponent implements OnInit {
  companyStorageList = [];
  states;
  companyStorageCompShow;
  companyStorageId;
  defaultPagination: number;
  totalCompanyStorageList: number;
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
        name: "Storage Location",
        code: "storage_address",
        sort_type:''
      },
      {  
        name: "Contact",
        code: "storage_contact_no",
        sort_type:''
      },
      {  
        name: "Email",
        code: "storage_email",
        sort_type:''
      }
    ];

    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.companyStorageCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageList(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.storageLocation.heading;
      this.help_description = res.data.storageLocation.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showStorageAdd() {
    this.companyStorageCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showStorageEdit(id) {
    this.companyStorageId = id;
    this.companyStorageCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadStorageList() {
    this.companyStorageCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageList(this.route.snapshot.params['id']);
  }

  getCompanyStorageList(id) {
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
    this.companyService.getCompanyStorageList(id,params).subscribe(
      (data: any[]) => {
        this.totalCompanyStorageList = data['count'];
        this.companyStorageList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalCompanyStorageList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalCompanyStorageList
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
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getCompanyStorageList(this.route.snapshot.params['id']);
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
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  };

}
