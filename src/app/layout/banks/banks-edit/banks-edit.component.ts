import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { BanksService } from '../../../core/services/banks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-banks-edit',
  templateUrl: './banks-edit.component.html',
  styleUrls: ['./banks-edit.component.scss']
})
export class BanksEditComponent implements OnInit {
  banks;
  companyList = [];
  bankList = [];
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private companyService: CompanyService,
    private banksService: BanksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      bank_branch: [null, Validators.required],
      bank_name: [null, Validators.required],
      bank_ifsc: [null, Validators.required]
    });
    this.banks = {
      id: '',
      company: '',
      bank_branch: '',
      bank_name: '',
      bank_ifsc: ''
    };

    this.getBankDetails(this.route.snapshot.params['id']);
    this.getCompanyDropdownList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.banksEdit.heading;
      this.help_description = res.data.banksEdit.desc;
    })
  }

  getBankDetails(id) {
    this.banksService.getBankDetails(id).subscribe(
      (data: any[]) => {
        this.banks = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
      }
    );
  };
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

  updateBank() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.banksService.updateBank(this.banks).subscribe(
        response => {
          this.toastr.success('Bank updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('banks');
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


}
