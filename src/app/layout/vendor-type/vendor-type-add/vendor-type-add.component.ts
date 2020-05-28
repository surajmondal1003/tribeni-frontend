import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorTypeService } from '../../../core/services/vendor-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-vendor-type-add',
  templateUrl: './vendor-type-add.component.html',
  styleUrls: ['./vendor-type-add.component.scss']
})
export class VendorTypeAddComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private vendorTypeService: VendorTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      vendor_type: [null, Validators.required],
    });
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendorTypeAdd.heading;
      this.help_description = res.data.vendorTypeAdd.desc;
      this.loading = LoadingState.Ready;
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addVendorType() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.vendorTypeService.addNewVendorType(this.form.value).subscribe(
        response => {
          this.toastr.success('Vendor type added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('vendor-type');
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
