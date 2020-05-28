import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { HelpService } from '../../../core/services/help.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-orders-details',
  templateUrl: './purchase-orders-details.component.html',
  styleUrls: ['./purchase-orders-details.component.scss']
})
export class PurchaseOrdersDetailsComponent implements OnInit {

  purchaseOrder;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  module = "purchaseorder";
  user_approve_details: any = [];
  isApproveStatus;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private helpService: HelpService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));
    this.getPurchaseOrderDetails(this.route.snapshot.params['id']);
    this.getHelp();

  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrderDetails.heading;
      this.help_description = res.data.purchaseOrderDetails.desc;
    })
  }

  getPurchaseOrderDetails(id) {
    this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseOrder = data;
        this.visible_key = true
        this.isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.purchaseOrder.approval_level)[0];
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
      let PurchaseOrder;

      if(value==2)
      {
        PurchaseOrder = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        PurchaseOrder = {
          id: id,
          approval_level:approval_level+1
        };
      }

      this.purchaseOrdersService.approveDisapprovePurchaseOrder(PurchaseOrder).subscribe(
        response => {
          this.toastr.success('Purchase order approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseOrderDetails(id);
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
