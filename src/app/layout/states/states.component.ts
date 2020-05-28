import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from '../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  stateList = [];
  defaultPagination: number;
  totalStateList: number;
  search_key = '';
  sort_by = '';
  sort_type = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];
  constructor(
    private statesService: StatesService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService,
    public dialog: MatDialog


  ) { }


  ngOnInit() {
    this.headerThOption = [
      {
        name: "State",
        code: "state_name",
        sort_type: ''
      },
      {
        name: "Tin",
        code: "tin_number",
        sort_type: ''
      },
      {
        name: "State Code",
        code: "state_code",
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
    this.getStateList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.state.heading;
      this.help_description = res.data.state.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getStateList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStateList() {
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
    this.statesService.getStateList(params).subscribe(
      (data: any[]) => {
        this.totalStateList = data['count'];
        this.stateList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalStateList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalStateList
        }
        this.loading = LoadingState.Ready;
        // console.log(data)
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  };

  activeState(id) {
    this.loading = LoadingState.Processing;
    let state;

    state = {
      id: id,
      status: true
    };
    this.statesService.activeInactiveState(state).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getStateList();
      },
      error => {
        console.log('error', error)
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveState(id) {
    this.loading = LoadingState.Processing;
    let state;

    state = {
      id: id,
      status: false
    };

    this.statesService.activeInactiveState(state).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getStateList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  deleteState(id) {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing;
        let state;

        state = {
          id: id,
          is_deleted: true
        };

        this.statesService.deleteState(state).subscribe(
          response => {
            this.toastr.success('State deleted successfully', '', {
              timeOut: 3000,
            });
            this.getStateList();
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
    this.getStateList();
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
    this.getStateList();
  };

}
