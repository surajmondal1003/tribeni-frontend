import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-module-activate-permission',
  templateUrl: './module-activate-permission.component.html',
  styleUrls: ['./module-activate-permission.component.scss']
})
export class ModuleActivatePermissionComponent implements OnInit {

  moduleActivatePermissionList = [];
  defaultPagination: number;
  totalModuleActivatePermissionList: number;
  search_key = '';
  sort_by = '';
  sort_type= '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Module",
       
      },
      {  
        name: "Permission Details",
      },
      // {  
      //   name: "Primary Employee",
      //   code: "email",
      //   sort_type:''
      // },
      // {  
      //   name: "Secondary Employee",
      //   code: "contact",
      //   sort_type:''
      // }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getModuleActivatePermissionList();
    this.getHelp();
  }
  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employee.heading;
      this.help_description = res.data.employee.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getModuleActivatePermissionList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getModuleActivatePermissionList() {
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
    this.employeesService.getEmployeeModuleActivateList(params).subscribe(
      (data: any[]) => {
        this.totalModuleActivatePermissionList = data['count'];
        this.moduleActivatePermissionList = data['results'];
        console.log(this.moduleActivatePermissionList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalModuleActivatePermissionList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalModuleActivatePermissionList
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

  



  pagination() {
    this.loading = LoadingState.Processing;
    this.getModuleActivatePermissionList();
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
    this.getModuleActivatePermissionList();
  };

}
