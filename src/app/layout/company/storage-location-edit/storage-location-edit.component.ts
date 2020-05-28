import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-storage-location-edit',
  templateUrl: './storage-location-edit.component.html',
  styleUrls: ['./storage-location-edit.component.scss']
})
export class StorageLocationEditComponent implements OnInit {
  @Input() companyStorageId: number;

  @Output() showStorageList = new EventEmitter();

  companyStorage;
  stateList;
  companyBranchList;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  form: FormGroup;
  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      storage_email: [null, [Validators.required,Validators.email]],
      storage_contact_no: [null, Validators.required],
      storage_address: [null, Validators.required],
      storage_state: [null, Validators.required],
      storage_city: [null, Validators.required],
      storage_pincode: [null, Validators.required],
      branch: [null, Validators.required]
    });
    // console.log(this.companyStorageId);
    this.companyStorage = {
      id: '',
      storage_email: '',
      storage_contact_no: '',
      storage_address: '',
      storage_state: '',
      storage_city: '',
      storage_pincode: '',
      company: this.route.snapshot.params['id'],
      branch: ''
    };

    this.getCompanyStorageDetails(this.companyStorageId);
    this.getStateList();
    this.getCompanyBranchList(this.route.snapshot.params['id'])
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
    this.help_heading = res.data.storageLocationEdit.heading;
    this.help_description = res.data.storageLocationEdit.desc;
    })
  }

  getCompanyStorageDetails(id) {

    this.companyService.getCompanyStorageDetails(id).subscribe(
      (data: any[]) => {
        this.companyStorage = data;
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

  updateCompanyStorage() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.companyService.updateCompanyStorage(this.companyStorage).subscribe(
        response => {
          this.toastr.success('Store updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.showStorageList.emit();
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

  btnClickNav() {
    this.showStorageList.emit();
  };

  getStateList() {
    this.statesService.getStateActiveList().subscribe(
      (data: any[]) => {
        this.stateList = data;
        // console.log(this.stateList)
      }
    );
  };

  getCompanyBranchList(id) {
    this.companyService.getCompanyBranchDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyBranchList = data;
        // console.log(this.companyBranchList);
      }
    );
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
