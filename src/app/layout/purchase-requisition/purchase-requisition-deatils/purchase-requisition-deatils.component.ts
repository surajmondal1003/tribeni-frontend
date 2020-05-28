import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { HelpService } from '../../../core/services/help.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-requisition-deatils',
  templateUrl: './purchase-requisition-deatils.component.html',
  styleUrls: ['./purchase-requisition-deatils.component.scss']
})
export class PurchaseRequisitionDeatilsComponent implements OnInit {

  purchaseRequisition;
  help_heading = "";
  help_description = "";
  module = "requisition";
  user_approve_details: any = [];
  isApproveStatus;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseRequisitionService: PurchaseRequisitionService,
    private router: Router,
    private route: ActivatedRoute,
    private helpService: HelpService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.purchaseRequisition = {
      company: { company_name: '', id: '' },
      project: { project_name: '', id: '' },
      requisition_map: [{ id: '', requisition_no: '' }],
      created_at: '',
      status: '',
      approval_level:'',
      created_by: { first_name: '', id: '' },
      requisition_detail: [{ 
          material: { material_code: '', material_fullname: '', id: '',material_type:{material_type:''} }, 
          quantity: '', uom: { id: '', name: '' }, 
           }]
    };
    this.getPurchaseRequisitionDetails(this.route.snapshot.params['id']);
    this.getHelp();

    this.user_approve_details  = JSON.parse(localStorage.getItem('approve_details'));
   
    
    //var contentDetails = this.moduleList.filter(p => p.content_id == this.form.value.content)[0];
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisitionDetails.heading;
      this.help_description = res.data.purchaseRequisitionDetails.desc;
    })
  }

  getPurchaseRequisitionDetails(id) {

    this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseRequisition = data;


        this.isApproveStatus = this.user_approve_details.filter(p => p.content == this.module && p.level <= this.purchaseRequisition.approval_level)[0];

       

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

  changeApproveStatus(value, id,approval_level) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let purchaseRequisition;

      if(value==2)
      {
        purchaseRequisition = {
          id: id,
          is_approve:value,
          approval_level:0
        };
      }
      else
      {
        purchaseRequisition = {
          id: id,
          approval_level:approval_level+1
        };
      }

      this.purchaseRequisitionService.changeApproveStatusPurchaseRequisition(purchaseRequisition).subscribe(
        response => {
          this.toastr.success('Purchase requisition approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseRequisitionDetails(id);
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
