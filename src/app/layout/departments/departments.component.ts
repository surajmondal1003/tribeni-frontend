import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../core/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departmentList = [];
  defaultPagination: number;
  totalDepartmentList: number;
  search_key = '';
  sort_by = '';
  sort_type = '';
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
    private departmentsService: DepartmentsService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "Department",
        code: "department_name",
        sort_type: ''
      },
      {
        name: "Company",
        code: "company__company_name",
        sort_type: ''
      },
      {
        name: "Status",
        code: "status",
        sort_type: ''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getdepartmentList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.department.heading;
      this.help_description = res.data.department.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getdepartmentList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getdepartmentList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }
    if (this.sort_by != '') {
      params.set('field_name', this.sort_by.toString());
    }

    if (this.sort_type != '') {
      params.set('order_by', this.sort_type.toString());
    }
    this.departmentsService.getDepartmentList(params).subscribe(
      (data: any[]) => {
        this.totalDepartmentList = data['count'];
        this.departmentList = data['results'];
        // console.log(this.departmentList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalDepartmentList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalDepartmentList
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

  activeDepartment(id) {
    this.loading = LoadingState.Processing;
    let department;

    department = {
      id: id,
      status: true
    };
    this.departmentsService.activeInactiveDepartment(department).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveDepartment(id) {
    this.loading = LoadingState.Processing;
    let department;

    department = {
      id: id,
      status: false
    };

    this.departmentsService.activeInactiveDepartment(department).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteDepartment(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let department;

        department = {
          id: id,
          is_deleted: true
        };

        this.departmentsService.deleteDepartment(department).subscribe(
          response => {
            this.toastr.success('Department deleted successfully', '', {
              timeOut: 3000,
            });
            this.getdepartmentList();
          },
          error => {
            this.loading = LoadingState.Ready;
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }
        );
      }
      this.dialogRef = null;
    });

  };

  pagination() {
    this.loading = LoadingState.Processing;
    this.getdepartmentList();
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
    this.getdepartmentList();
  };


}
