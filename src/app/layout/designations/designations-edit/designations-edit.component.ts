import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../core/services/departments.service';
import { CompanyService } from '../../../core/services/company.service';
import { DesignationsService } from '../../../core/services/designations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-designations-edit',
  templateUrl: './designations-edit.component.html',
  styleUrls: ['./designations-edit.component.scss']
})
export class DesignationsEditComponent implements OnInit {
  designationDetails: any
  company_list: any[] = [];
  department_list: any[] = [];
  form: FormGroup;
  help_heading = "";
  help_description = "";
  visible_key: boolean;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private departmentsService: DepartmentsService,
    private companyService: CompanyService,
    private designationsService: DesignationsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.designationDetails = {
      company: '',
      departments: '',
      designation_name: ''
    }
    this.form = this.formBuilder.group({
      company: ['', Validators.required],
      departments: ['', Validators.required],
      designation_name: ['', Validators.required]
    });
    this.getHelp();
    this.getCompanyList();
    this.getDesignationDetails(this.route.snapshot.params['id']);
  }

  getDesignationDetails(id) {
    this.designationsService.getDesignationDetails(id).subscribe(res => {
      this.designationDetails = res;
      // console.log(this.designationDetails)      
      this.getDepartmentList(this.designationDetails.company);
      this.loading = LoadingState.Ready;
      this.visible_key = true;
    },
    error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.designationEdit.heading;
      this.help_description = res.data.designationEdit.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
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

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  updateDesignation() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.designationsService.updateDesignation(this.designationDetails).subscribe(
        response => {
          this.toastr.success('Designation updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('designations');
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

  reSet() {
    this.form.reset();
  }


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
