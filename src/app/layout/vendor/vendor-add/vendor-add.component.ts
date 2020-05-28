import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from '../../../core/services/states.service';
import { VendorService } from '../../../core/services/vendor.service';
import { VendorTypeService } from '../../../core/services/vendor-type.service';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  form: FormGroup;
  vendor_address: any[] = [];
  vendor_account: any[] = [];
  stateList = [];
  vendorTypeList = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private statesService: StatesService,
    private vendorService: VendorService,
    private vendorTypeService:VendorTypeService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      vendor_fullname: ['', Validators.required],
      vendor_type: ['', Validators.required],
      pan_no: [''],
      cin_no: [''],
      gst_no: [''],
      vendor_address: this.formBuilder.array([this.createContactInfo()]),
      vendor_account: this.formBuilder.array([this.createBankInfo()])
    });
    this.getVendorTypeList()
    this.getStateList()
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendorAdd.heading;
      this.help_description = res.data.vendorAdd.desc;
    })
  }

  getVendorTypeList() {
    this.vendorTypeService.getVendorTypeListWithoutPagination().subscribe(res => {
      this.vendorTypeList = res;
      this.loading = LoadingState.Ready;
    },
    error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }

  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
    });
  };

  createContactInfo() {
    return this.formBuilder.group({
      email: ['', [
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      mobile: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      contact_person: ['', Validators.required],
      designation: [''],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  createBankInfo() {
    return this.formBuilder.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      ifsc_code: ['', Validators.required]
    });
  }

  getContact(form) {
    return form.get('vendor_address').controls
  }
  addContact() {
    const control = <FormArray>this.form.controls['vendor_address'];
    control.push(this.createContactInfo());
  }

  deleteContact(index: number) {
    const control = <FormArray>this.form.controls['vendor_address'];
    control.removeAt(index);
  }

  getBank(form) {
    return form.get('vendor_account').controls
  }
  addBank() {
    const control = <FormArray>this.form.controls['vendor_account'];
    control.push(this.createBankInfo());
  }
  deleteBank(index: number) {
    const control = <FormArray>this.form.controls['vendor_account'];
    control.removeAt(index);
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  
  addVendor() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.vendorService.addNewVendor(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Vendor added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('vendor');
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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  reSet() {
    this.form.reset();
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
