import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeeList = [];
  defaultPagination: number;
  totalEmployeeList: number;
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
        name: "First Name",
        code: "first_name",
        sort_type:''
      },
      {  
        name: "Last Name",
        code: "last_name",
        sort_type:''
      },
      {  
        name: "Email",
        code: "email",
        sort_type:''
      },
      {  
        name: "Contact",
        code: "contact",
        sort_type:''
      },
      {  
        name: "Company",
        code: "company__company_name",
        sort_type:''
      },
      {  
        name: "Department",
        code: "departments__department_name",
        sort_type:''
      },
      {  
        name: "Designation",
        code: "designation__designation_name",
        sort_type:''
      },
      {  
        name: "Status",
        code: "status",
        sort_type:''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getEmployeeList();
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
    this.getEmployeeList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getEmployeeList() {
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
    this.employeesService.getEmployeeList(params).subscribe(
      (data: any[]) => {
        this.totalEmployeeList = data['count'];
        this.employeeList = data['results'];
        console.log(this.employeeList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalEmployeeList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalEmployeeList
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

  activeState(id) {
    this.loading = LoadingState.Processing;
    let employee;

    employee = {
      id: id,
      status: true
    };
    this.employeesService.activeInactiveEmployee(employee).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveState(id) {
    this.loading = LoadingState.Processing;
    let employee;

    employee = {
      id: id,
      status: false
    };

    this.employeesService.activeInactiveEmployee(employee).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteEmployee(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let employee;

        employee = {
          id: id
        };

        this.employeesService.deleteEmployee(employee).subscribe(
          response => {
            this.toastr.success('Employee deleted successfully', '', {
              timeOut: 3000,
            });
            this.getEmployeeList();
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
    this.getEmployeeList();
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
    this.getEmployeeList();
  };

}
