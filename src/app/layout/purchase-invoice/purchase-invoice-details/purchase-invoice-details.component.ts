import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { HelpService } from '../../../core/services/help.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-invoice-details',
  templateUrl: './purchase-invoice-details.component.html',
  styleUrls: ['./purchase-invoice-details.component.scss']
})
export class PurchaseInvoiceDetailsComponent implements OnInit {

  purchaseInvoice;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  module = "purchaseinvoice";
  user_approve_details: any = [];
  isApproveStatus;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseInvoiceService: PurchaseInvoiceService,
    private router: Router, 
    private route: ActivatedRoute,
    private helpService: HelpService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));
    this.getPurchaseInvoiceDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseInvoiceDetails.heading;
      this.help_description = res.data.purchaseInvoiceDetails.desc;
    })
  }


  getPurchaseInvoiceDetails(id) {
    this.purchaseInvoiceService.getPurchaseInvoiceDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseInvoice = data;
        // console.log(this.purchaseInvoice)
        this.visible_key = true
        this.isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.purchaseInvoice.approval_level)[0];
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };


  changeApproveStatus(value, id,approval_level) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let grn;

      if(value==2)
      {
        grn = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        grn = {
          id: id,
          approval_level:approval_level+1
        };
      }

      this.purchaseInvoiceService.approveDisapprovePurchaseInvoice(grn).subscribe(
        response => {
          this.toastr.success('Purchase invoice approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseInvoiceDetails(id);
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
