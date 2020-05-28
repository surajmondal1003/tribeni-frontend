import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrnService } from '../../../core/services/grn.service';
import { GrnReverseService } from '../../../core/services/grn-reverse.service';
import { StocksService } from '../../../core/services/stocks.service';
import { CompanyService } from '../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-reverse-grn-details',
  templateUrl: './reverse-grn-details.component.html',
  styleUrls: ['./reverse-grn-details.component.scss']
})
export class ReverseGrnDetailsComponent implements OnInit {

  reverse_grnDetails;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  module = "reversgrn";
  user_approve_details: any = [];
  isApproveStatus;
  loading: LoadingState = LoadingState.NotReady;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private grnService: GrnService,
    private grnReverseService: GrnReverseService,
    private stocksService: StocksService,
    private companyService: CompanyService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));
    console.log(this.user_approve_details);
    this.getReverseGrnDetails(this.route.snapshot.params['id']);
    this.getHelp();

  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
     // this.help_heading = res.data.grnDetails.heading;
      //this.help_description = res.data.grnDetails.desc;
    })
  }

  getReverseGrnDetails(id) {
    this.grnReverseService.getReverseGrnDetails(id).subscribe(
      (data: any[]) => {
        this.reverse_grnDetails = data;
        console.log(this.reverse_grnDetails);
        this.visible_key = true
        this.isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.reverse_grnDetails.approval_level)[0];
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
      }
    );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getRequisitionDate(date) {
    var PrDate = date.split('/')
    return PrDate[0]
  }

  changeApproveStatus(value, id,approval_level) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let reverse_grn;

      if(value==2)
      {
        reverse_grn = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        reverse_grn = {
          id: id,
          approval_level:approval_level+1
        };
      }

      this.grnReverseService.approveDisapproveReverseGrn(reverse_grn).subscribe(
        response => {
          this.toastr.success('Reverse Grn approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getReverseGrnDetails(id);
        },
        error => {
          
          this.loading = LoadingState.Ready;
          if(error.error.message)
          {
            this.toastr.error(error.error.message, '', {
              timeOut: 3000,
            });
          }
          else{
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }
          
        }
      );
    }

  }

}
