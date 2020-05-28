import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstRatesService } from '../../core/services/gst-rates.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-gst-rates',
  templateUrl: './gst-rates.component.html',
  styleUrls: ['./gst-rates.component.scss']
})
export class GstRatesComponent implements OnInit {
  gstRatesList = [];
  defaultPagination: number;
  totalGstRatesList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  sort_by = '';
  sort_type = '';
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];

  constructor(
    private router: Router,
    private gstRatesService: GstRatesService,
    private toastr: ToastrService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {

    this.headerThOption = [
      {
        name: "Identifiable Name",
        code: "gst_pattern",
        sort_type: ''
      },
      {
        name: "CGST(%)",
        code: "cgst",
        sort_type: ''
      },
      {
        name: "SGST(%)",
        code: "sgst",
        sort_type: ''
      },
      {
        name: "IGST(%)",
        code: "igst",
        sort_type: ''
      },
      {
        name: "Created at",
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
    this.getGstList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.gst.heading;
      this.help_description = res.data.gst.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getGstList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getGstList() {
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

    this.gstRatesService.getGSTList(params).subscribe(
      (data: any[]) => {
        this.totalGstRatesList = data['count'];
        this.gstRatesList = data['results'];
        // console.log(this.gstRatesList);
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalGstRatesList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalGstRatesList
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

  activeGst(id) {
    this.loading = LoadingState.Processing;
    let gstRate;

    gstRate = {
      id: id,
      status: true
    };
    this.gstRatesService.activeInactiveGST(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getGstList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveGst(id) {
    this.loading = LoadingState.Processing;
    let gstRate;

    gstRate = {
      id: id,
      status: false
    };

    this.gstRatesService.activeInactiveGST(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getGstList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteGST(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let gstRate;

        gstRate = {
          id: id,
          is_deleted: true
        };

        this.gstRatesService.deleteGST(gstRate).subscribe(
          response => {
            this.toastr.success('GST rate deleted successfully', '', {
              timeOut: 3000,
            });
            this.getGstList();
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
    this.getGstList();
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
    this.getGstList();
  };

}
