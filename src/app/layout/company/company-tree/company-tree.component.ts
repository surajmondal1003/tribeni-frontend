import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-company-tree',
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.scss']
})
export class CompanyTreeComponent implements OnInit {
  companyList;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private helpService: HelpService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCompanyList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.company.heading;
      this.help_description = res.data.company.desc;
    })
  }
  getCompanyList() {
    this.companyService.getCompanyList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

}
