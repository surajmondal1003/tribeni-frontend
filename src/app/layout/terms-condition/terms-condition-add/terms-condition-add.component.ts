import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { TermsConditionService } from '../../../core/services/terms-condition.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-terms-condition-add',
  templateUrl: './terms-condition-add.component.html',
  styleUrls: ['./terms-condition-add.component.scss']
})
export class TermsConditionAddComponent implements OnInit {
  form: FormGroup;
  companyList = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private termsConditionService: TermsConditionService,
    private companyService: CompanyService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      term_type: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      term_text: new FormControl('', Validators.required)
    });
    this.getCompanyDropdownList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.termsAdd.heading;
      this.help_description = res.data.termsAdd.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        this.loading = LoadingState.Ready;
      }
    );
  };
  addNewTerms() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.termsConditionService.addNewTerms(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Terms and services added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('terms-condition');
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

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }

}
