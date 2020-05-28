import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeesService } from '../../../core/services/employees.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-employee-attendance-add',
  templateUrl: './employee-attendance-add.component.html',
  styleUrls: ['./employee-attendance-add.component.scss']
})
export class EmployeeAttendanceAddComponent implements OnInit {

  form: FormGroup;
  help_heading = "";
  help_description = "";
  employeeList = [];
  loading: LoadingState = LoadingState.NotReady;

  in_time = {hour: '', minute: ''};
  out_time = {hour: '', minute: ''};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
  meridian = false;

   constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      employee: ['', Validators.required],
      date: ['', Validators.required],
      in_time: ['', Validators.required],
      out_time: ['', Validators.required]
    });
    this.getEmployeeList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grn.heading;
      this.help_description = res.data.grn.desc;
      this.loading = LoadingState.Ready
    })
  }

  getEmployeeList() {
    this.employeesService.getEmployeeListWithoutPagination().subscribe(
      (data: any[]) => {
        this.employeeList = data;
      }
    );
  };

  
  addAttendance(){
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      var in_time = this.form.value.in_time.hour+":"+this.form.value.in_time.minute+":00";
      var out_time = this.form.value.out_time.hour+":"+this.form.value.out_time.minute+":00";
      
      var date = new Date(this.form.value.date.year, this.form.value.date.month - 1, this.form.value.date.day)
      this.form.patchValue({
        date: date.toISOString(),
        in_time: in_time,
        out_time:out_time
      })

      this.employeesService.addEmployeesAttendance(this.form.value).subscribe(
        response => {
          this.toastr.success('Attendance added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('employees/attendance');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  reSet(){
    this.form.reset();
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

}
