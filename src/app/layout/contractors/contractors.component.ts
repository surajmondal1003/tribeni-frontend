import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorsService } from '../../core/services/contractors.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {
  contractorList = []
  defaultPagination: number;
  totalContractorList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  loading: LoadingState = LoadingState.NotReady;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  sort_by = '';
  sort_type = '';
  headerThOption = [];
  constructor(
    private router: Router,
    private contractorService: ContractorsService,
    private toastr: ToastrService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "Contractor Name",
        code: "contractor_name",
        sort_type: ''
      },
      {
        name: "PAN",
        code: "pan_no",
        sort_type: ''
      },
      {
        name: "GSTIN",
        code: "gst_no",
        sort_type: ''
      },
      {
        name: "Address",
        code: "address",
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
    this.getContractorList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.contractor.heading;
      this.help_description = res.data.contractor.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getContractorList();
  }
  
  getContractorList() {
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
    this.contractorService.getContractorList(params).subscribe(
      (data: any[]) => {
        this.totalContractorList = data['count'];
        this.contractorList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalContractorList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalContractorList
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

  activeContractor(id) {
    this.loading = LoadingState.Processing;
    let contractor;

    contractor = {
      id: id,
      status: true
    };
    this.contractorService.activeInactiveContractor(contractor).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getContractorList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveContractor(id){
    this.loading = LoadingState.Processing;
    let contractor;

    contractor = {
      id: id,
      status: false
    };
    this.contractorService.activeInactiveContractor(contractor).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getContractorList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  deleteContractor(id) {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let contractor;

        contractor = {
          id: id,
          is_deleted: true
        };

        this.contractorService.deleteContractor(contractor).subscribe(
          response => {
            this.toastr.success('State deleted successfully', '', {
              timeOut: 3000,
            });
            this.getContractorList();
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
    this.getContractorList();
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
    this.getContractorList();
  };
}
