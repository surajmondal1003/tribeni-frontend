import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../core/services/states.service';
import { CompanyService } from '../../../core/services/company.service';
import { TransportService } from '../../../core/services/transport.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.scss']
})
export class TransportEditComponent implements OnInit {
  transport;
  form: FormGroup;
  companyList = [];
  stateList = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private transportService: TransportService,
    private companyService: CompanyService,
    private statesService: StatesService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      transporter_name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]),
      company: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      pan: new FormControl(''),
      gstin: new FormControl('')
    });
    this.getCompanyList();
    this.getStateList();
    this.getTransport(this.route.snapshot.params['id']);
    this.transport = {
      transporter_name: '',
      email: '',
      phone: '',
      company: '',
      city: '',
      pan: '',
      pin: '',
      gstin: ''
    };
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.transportEdit.heading;
      this.help_description = res.data.transportEdit.desc;
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
    }
    );
  };
  
  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
      }
    );
  };
  getTransport(id) {
    this.transportService.getTransporterDetails(id).subscribe(res => {
      this.transport = res;
      this.loading = LoadingState.Ready;
    },
    error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  updateTransport() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.transportService.updateTransporter(this.transport).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Transporter updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('transport');
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
