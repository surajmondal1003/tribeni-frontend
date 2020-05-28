import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrnService } from '../../../core/services/grn.service';
import { HelpService } from '../../../core/services/help.service';
import { StocksService } from '../../../core/services/stocks.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';


@Component({
  selector: 'app-grn-details',
  templateUrl: './grn-details.component.html',
  styleUrls: ['./grn-details.component.scss']
})
export class GrnDetailsComponent implements OnInit {

  grnDetails;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  module = "grn";
  user_approve_details: any = [];
  isApproveStatus;
  stock: any = []
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private grnService: GrnService,
    private router: Router,
    private route: ActivatedRoute,
    private helpService: HelpService,
    private toastr: ToastrService,
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.user_approve_details = JSON.parse(localStorage.getItem('approve_details'));
    this.getGrnDetails(this.route.snapshot.params['id']);
    this.getHelp();

  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      // this.help_heading = res.data.grnDetails.heading;
      //this.help_description = res.data.grnDetails.desc;
    })
  }

  getGrnDetails(id) {
    this.grnService.getGrnDetails(id).subscribe(
      (data: any[]) => {
        this.grnDetails = data;
        console.log(this.grnDetails);
        this.visible_key = true
        this.isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.grnDetails.approval_level)[0];
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

  changeApproveStatus(value, id, approval_level) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let grn;

      if (value == 2) {
        grn = {
          id: id,
          is_approve: value,
          approval_level: 0
        };
      }
      else {
        grn = {
          id: id,
          approval_level: approval_level + 1
        };
      }

      this.grnService.approveDisapproveGrn(grn).subscribe(
        response => {
          console.log(response);
          if (response.is_approve == 1) {
            this.addNewStock(id)
          }
          else {
            this.toastr.success('Grn approve status changed successfully', '', {
              timeOut: 3000,
            });
            this.getGrnDetails(this.route.snapshot.params['id']);
          }
        },
        error => {

          this.loading = LoadingState.Ready;
          if (error.error.message) {
            this.toastr.error(error.error.message, '', {
              timeOut: 3000,
            });
          }
          else {
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }

        }
      );
    }

  }

  addNewStock(id) {
    this.grnService.getGrnDetails(id).subscribe(res => {
      res.grn_detail.forEach(x => {
        var obj = res.po_order.purchase_order_detail.filter(k => k.material.id == x.material.id && k.material.material_type_id == x.material.material_type_id)
        var d = {
          grn: res.id,
          company: res.company.id,
          company_project: res.project.id,
          material: x.material.id,
          material_type: x.material.material_type_id,
          rate: obj[0].rate,
          quantity: x.receive_quantity
        }
        this.stock.push(d)
      })
      var i = 0;
      this.stock.forEach(s => {
        i++;
        this.insertStock(s, i);
      })
    })
  }

  insertStock(d, i) {
    this.stocksService.addNewStock(d).subscribe(
      response => {
        this.loading = LoadingState.Ready;
        if (i == this.stock.length) {
          this.toastr.success('Grn approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getGrnDetails(this.route.snapshot.params['id']);
        }
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

}
