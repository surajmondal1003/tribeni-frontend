import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksService } from '../../../core/services/stocks.service';
import { CompanyService } from '../../../core/services/company.service';
import { ContractorsService } from '../../../core/services/contractors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-stocks-issue',
  templateUrl: './stocks-issue.component.html',
  styleUrls: ['./stocks-issue.component.scss']
})
export class StocksIssueComponent implements OnInit {
  stockDetails: any;
  form: FormGroup;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  project_list: any = [];
  contractor_list: any = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private stocksService: StocksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,
    private companyService: CompanyService,
    private contractorsService: ContractorsService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      stockview: ['', Validators.required],
      material: ['', Validators.required],
      material_type: ['', Validators.required],
      quantity: ['', Validators.required],
      note: ['', Validators.required],
      from_project: ['', Validators.required],
      to_project: ['', Validators.required],
      transfer_type: ['', Validators.required],
      issue_type: [''],
      contractor: ['', Validators.required]
    });
    this.getStockDetails(this.route.snapshot.params['id']);
    this.getHelp();
    this.getContractors();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stockIssue.heading;
      this.help_description = res.data.stockIssue.desc;
    })
  }

  getContractors() {
    this.contractorsService.getContractorListWithoutPagination().subscribe(res => {
      // console.log(res)
      this.contractor_list = res;
    })
  }

  getCompanyProject(id) {
    this.companyService.getCompanyProjectDropdownList(id).subscribe(res => {
      // console.log(res);
      this.project_list = res;
      this.visible_key = true;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  getStockDetails(id) {
    this.stocksService.getStockDetails(id).subscribe(
      (data: any[]) => {
        this.stockDetails = data;
        // console.log(this.stockDetails)
        this.getCompanyProject(this.stockDetails.company_details.id)
        this.form.patchValue({
          stockview: this.stockDetails.id,
          material: this.stockDetails.material_details.id,
          material_type: this.stockDetails.material_type.id,
          from_project: this.stockDetails.company_project_details.id
        })
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

  getValueCheck(val) {
    if (val > Math.round(this.stockDetails.quantity)) {
      this.toastr.error('Quantity should not be more then available quantity', '', {
        timeOut: 3000,
      });
      this.form.patchValue({
        quantity: Math.round(this.stockDetails.quantity)
      })
      return;
    }
  }

  stockIssue() {
    if (this.form.valid) {
      if (this.form.value.from_project == this.form.value.to_project) {
        this.form.patchValue({
          issue_type: 2
        })
      }
      else {
        this.form.patchValue({
          issue_type: 1
        })
      }
      this.loading = LoadingState.Processing;
      this.stocksService.addNewStockIssue(this.form.value).subscribe(res => {
        this.toastr.success('Stock issued successfully', '', {
          timeOut: 3000,
        });
        this.loading = LoadingState.Ready;
        this.router.navigateByUrl('/stocks/issue-history/' + this.route.snapshot.params['id']);
      },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      )
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
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

  getAvlChek(val) {
    if (Math.round(val) > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}
