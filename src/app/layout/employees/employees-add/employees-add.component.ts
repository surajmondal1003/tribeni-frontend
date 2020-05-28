import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../../core/services/departments.service';
import { CompanyService } from '../../../core/services/company.service';
import { DesignationsService } from '../../../core/services/designations.service';
import { EmployeesService } from '../../../core/services/employees.service';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { StatesService } from '../../../core/services/states.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.scss']
})
export class EmployeesAddComponent implements OnInit {
  stateList: any[] = [];
  company_list: any[] = [];
  department_list: any[] = [];
  designation_list: any[] = [];
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private departmentsService: DepartmentsService,
    private companyService: CompanyService,
    private designationsService: DesignationsService,
    private employeesService: EmployeesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private statesService: StatesService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      groups:[[]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      employee_profile_details: this.formBuilder.array([this.createEmployeeProfile()]),
    });
    this.getHelp();
    this.getCompanyList();
    this.getStateList()
  }

  createEmployeeProfile()
  { 
    return this.formBuilder.group({
      contact: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      alt_contact: ['',[
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      dob: ['', Validators.required],
      blood_group: [''],
      pan: [''],
      adhaar_no: ['', Validators.required],
      emp_present_address: ['', Validators.required],
      emp_present_state: ['', Validators.required],
      emp_present_city: ['', Validators.required],
      emp_present_pin: ['', Validators.required],
      emp_permanent_address: [''],
      emp_permanent_state: [''],
      emp_permanent_city: [''],
      emp_permanent_pin: [''],
      company: ['', Validators.required],
      departments: ['', Validators.required],
      designation: ['', Validators.required]
    });

  };

  getEmployeeProfile(form) {
    return form.get('employee_profile_details').controls
  }

  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
    });
  };

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employeeAdd.heading;
      this.help_description = res.data.employeeAdd.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
      this.loading = LoadingState.Ready;
    },
    error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }

  companyChange(val) {
    if (val != "") {
      this.getDepartmentList(val);
    }
  }

  getDepartmentList(id) {
    this.departmentsService.getDepartmentListByCompany(id).subscribe(res => {
      this.department_list = res;
    })
  }

  departmentChange(val) {
    if (val != "") {
      this.getDesignationList(val);
    }
  }

  getDesignationList(id) {
    this.designationsService.getDesignationListByDept(id).subscribe(res => {
      this.designation_list = res;
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addEmployee() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      var date = new Date(this.form.value.employee_profile_details[0].dob.year, this.form.value.employee_profile_details[0].dob.month - 1, this.form.value.employee_profile_details[0].dob.day)
      this.form.patchValue({
        //dob: date.toISOString()
        employee_profile_details:[
          {
            dob:date.toISOString()
          }]
      })
      
      this.employeesService.addNewEmployee(this.form.value).subscribe(
        response => {
          this.toastr.success('Employee added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('employees');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  reSet() {
    this.form.reset();
  }


  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
