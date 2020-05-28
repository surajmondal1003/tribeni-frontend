import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company;
  states;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private helpService: HelpService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.company = {
      id: '',
      company_name: '',
      company_url: '',
      company_email: '',
      company_contact: '',
      company_address: '',
      company_state: '',
      company_city: '',
      company_pin: '',
      company_gst: '',
      company_pan: '',
      company_cin: ''
    };

    this.states = {
      id: '',
      state_name: '',
      tin_number: '',
      state_code: ''
    };
    this.getCompanyDetails(this.route.snapshot.params['id']);

    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.companyDetails.heading;
      this.help_description = res.data.companyDetails.desc;
    })
  }

  getCompanyDetails(id) {
    this.companyService.getCompanyDetails(id).subscribe(
      (data: any[]) => {
        this.company = data;
        if (this.company.company_state) {
          this.getStateDetails(this.company.company_state);
        }
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

  getStateDetails(id) {
    this.statesService.getStateDetails(id).subscribe(
      (data: any[]) => {
        this.states = data;
      }
    );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

}
