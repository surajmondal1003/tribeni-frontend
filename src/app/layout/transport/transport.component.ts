import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../../core/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  transportList = [];
  defaultPagination: number;
  totalTransportList: number;
  search_key = '';
  sort_by = '';
  sort_type= '';
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
    private transportService: TransportService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Transport",
        code: "transporter_name",
        sort_type:''
      },
      {  
        name: "Created Date",
        code: "created_at",
        sort_type:''
      },
      {  
        name: "Status",
        code: "status",
        sort_type:''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getTransportList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.transport.heading;
      this.help_description = res.data.transport.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getTransportList();
  }

  getTransportList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if(this.search_key !='')
    {
      params.set('search', this.search_key.toString());
    }
    if(this.sort_by !='')
    {
      params.set('field_name', this.sort_by.toString());
    }

    if(this.sort_type !='')
    {
      params.set('order_by', this.sort_type.toString());
    }
    this.transportService.getTransporterList(params).subscribe(
      (data: any[]) => {

        this.totalTransportList = data['count'];
        this.transportList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalTransportList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalTransportList
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

  activeTransport(id) {
    this.loading = LoadingState.Processing;
    let transporter;

    transporter = {
      id: id,
      status: true
    };
    this.transportService.activeInactiveTransporter(transporter).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTransportList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveTransport(id) {
    this.loading = LoadingState.Processing;
    let transporter;

    transporter = {
      id: id,
      status: false
    };

    this.transportService.activeInactiveTransporter(transporter).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTransportList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteTransport(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let transporter;

        transporter = {
          id: id,
          is_deleted: true
        };

        this.transportService.deleteTransporter(transporter).subscribe(
          response => {
            this.toastr.success('Transporter deleted successfully', '', {
              timeOut: 3000,
            });
            this.getTransportList();
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
    this.getTransportList();
  };

  sortTable(value){
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if(optionValue.code == value)
      {
        if(optionValue.sort_type =='desc')
        {
          type = 'asc';
        }
        else
        {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else{
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getTransportList();
  };
}
