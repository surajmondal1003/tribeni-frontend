import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss']
})
export class EmployeeAttendanceComponent implements OnInit {

  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  employee_list: any = [];
  employee_attendance_list: any = [];
  months: any = [];
  month;
  years: any = [];
 
  employee

  constructor(
    private helpService: HelpService,
    private router: Router,
    private toastr: ToastrService,
    private employeesService: EmployeesService
  ) { }

  ngOnInit() {
    this.employee = {
      month: '',
      year: '',
      emp: ''
    };

    this.employee.year = new Date().getFullYear();
    for (var i = 2; i > 0; i--) {
      this.years.push(this.employee.year - i);
    }   
    this.years.push(this.employee.year);
    this.employee.month = new Date().getMonth() +1;

    this.months.push({value:1, text:'January'});
    this.months.push({value:2, text:'February'});
    this.months.push({value:3, text:'March'});
    this.months.push({value:4, text:'April'});
    this.months.push({value:5, text:'May'});
    this.months.push({value:6, text:'June'});
    this.months.push({value:7, text:'July'});
    this.months.push({value:8, text:'August'});
    this.months.push({value:9, text:'September'});
    this.months.push({value:10, text:'October'});
    this.months.push({value:11, text:'November'});
    this.months.push({value:12, text:'December'});

    this.getHelp();
    this.getEmployeeList();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grn.heading;
      this.help_description = res.data.grn.desc;
      this.loading = LoadingState.Ready
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getEmployeeList() {
    this.employeesService.getEmployeeListWithoutPagination().subscribe(res => {
      console.log(res);
      this.employee_list = res;
    })
  }

  // changeEmployee(id) {
  //   this.getAttendanceList(id);
  // }

  getEmployeeAttendanceList() {
    let params: URLSearchParams = new URLSearchParams();
    if (this.month != '') {
      if(this.employee.month<10)
      {
        var monthValue = '0'+this.employee.month
      }
      var month = this.employee.year+'-'+monthValue+'-01'
      params.set('month', month.toString());
      this.employeesService.getEmployeeAttendanceList(this.employee.emp,params).subscribe(
        (data: any[]) => {
          
          this.employee_attendance_list = data;
          
          this.loading = LoadingState.Ready;
          console.log(this.employee_attendance_list)
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      )
    }
  }

}
