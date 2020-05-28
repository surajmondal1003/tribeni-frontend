import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorTypeService } from '../../../core/services/vendor-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-vendor-type-edit',
  templateUrl: './vendor-type-edit.component.html',
  styleUrls: ['./vendor-type-edit.component.scss']
})
export class VendorTypeEditComponent implements OnInit {
  //vendorTypes;
  vendorType;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private vendorTypeService: VendorTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.vendorType = {
      id: '',
      vendor_type: '',      
    };
    this.form = this.formBuilder.group({
      vendor_type: [null, Validators.required],      
    });
    this.getVendorTypeDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendorTypeEdit.heading;
      this.help_description = res.data.vendorTypeEdit.desc;
    })
  }

  getVendorTypeDetails(id) {
    this.vendorTypeService.getVendorTypeDetails(id).subscribe(
      (data: any[]) => {
        this.vendorType = data;
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

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  updateVendorType() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;  
      this.vendorTypeService.updateVendorType(this.vendorType).subscribe(
        response => {
          this.toastr.success('Vendor type updated successfully', '', {
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

  btnClickNav(toNav) {
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
}
