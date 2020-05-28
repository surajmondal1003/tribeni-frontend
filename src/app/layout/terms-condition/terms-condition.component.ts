import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermsConditionService } from '../../core/services/terms-condition.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../core/services/company.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  termsList = [];
  defaultPagination: number;
  totalTermsList: number;
  search_key = '';
  sort_by = '';
  sort_type = '';
  companyList = [];
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private termsConditionService: TermsConditionService,
    private companyService: CompanyService,
    private helpService: HelpService,
    public dialog: MatDialog,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "Terms & Condition",
        code: "term_text",
        sort_type: ''
      },
      {
        name: "Company Name",
        code: "company__company_name",
        sort_type: ''
      },
      {
        name: "Created Date",
        code: "created_at",
        sort_type: ''
      },
      {
        name: "Status",
        code: "status",
        sort_type: ''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getTermsList();

    this.getCompanyDropdownList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.terms.heading;
      this.help_description = res.data.terms.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getTermsList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
      }
    );
  };

  getTermsList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }
    if (this.sort_by != '') {
      params.set('field_name', this.sort_by.toString());
    }

    if (this.sort_type != '') {
      params.set('order_by', this.sort_type.toString());
    }
    this.termsConditionService.getTermsList(params).subscribe(
      (data: any[]) => {
        this.totalTermsList = data['count'];
        this.termsList = data['results'];

        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalTermsList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalTermsList
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
  };
  getCompanyName(id) {
    var data = { id: 0, company_name: '' }
    data = this.companyList.filter(x => x.id === id)[0];
    if (data != undefined) {
      return data.company_name
    }
  }
  activeTerm(id) {
    this.loading = LoadingState.Processing;
    let terms;

    terms = {
      id: id,
      status: true
    };
    this.termsConditionService.activeInactiveTerms(terms).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTermsList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveTerm(id) {
    this.loading = LoadingState.Processing;
    let terms;

    terms = {
      id: id,
      status: false
    };

    this.termsConditionService.activeInactiveTerms(terms).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTermsList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteTerm(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let terms;

        terms = {
          id: id,
          is_deleted: true
        };

        this.termsConditionService.deleteTerms(terms).subscribe(
          response => {
            this.toastr.success('Terms deleted successfully', '', {
              timeOut: 3000,
            });
            this.getTermsList();
          },
          error => {
            this.loading = LoadingState.Ready;
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }
        );
      }
      this.dialogRef = null;
    });
  };

  pagination() {
    this.loading = LoadingState.Processing;
    this.getTermsList();
  };

  sortTable(value) {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if (optionValue.code == value) {
        if (optionValue.sort_type == 'desc') {
          type = 'asc';
        }
        else {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else {
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getTermsList();
  };

}
