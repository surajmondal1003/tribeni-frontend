import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GrnService } from '../../../core/services/grn.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-invoice-add',
  templateUrl: './purchase-invoice-add.component.html',
  styleUrls: ['./purchase-invoice-add.component.scss']
})
export class PurchaseInvoiceAddComponent implements OnInit {
  form: FormGroup;
  grnList: any[] = [];
  pur_invoice_detail: any[] = [];
  visible_key: boolean;
  material_details_list: any[] = [];
  grn_details: any;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private grnService: GrnService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      purchase_inv_no: ['', Validators.required],
      grn: ['', Validators.required],
      total_gst: ['', Validators.required],
      total_amount: ['', Validators.required],
      vendor: ['', Validators.required],
      vendor_address: ['', Validators.required],
      company: ['', Validators.required],
      pur_invoice_detail: this.formBuilder.array([])
    });
    this.getGrnList()
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseInvoiceAdd.heading;
      this.help_description = res.data.purchaseInvoiceAdd.desc;
    })
  }


  getGrnList() {
    this.grnService.getGrnListWithoutPagination().subscribe(res => {
      this.grnList = res;
      this.loading = LoadingState.Ready;
      // console.log(res);
    })
  }
  grnChange(id) {
    this.loading = LoadingState.Processing;
    const pur_invoice_detail_control = <FormArray>this.form.controls['pur_invoice_detail'];
    if (id) {
      this.clearFormArray(pur_invoice_detail_control)
      this.grn_details = '';
      this.material_details_list = [];
      this.visible_key = false;
      this.grnService.getGrnDetails(id).subscribe(res => {
        this.grn_details = res;
        this.grn_details.grn_detail.forEach(x => {
          var PoDetails = this.grn_details.po_order.purchase_order_detail.filter(p => p.material.id === x.material.id)[0]
          if (PoDetails != undefined) {
            var material_value = Math.round(Math.round(PoDetails.rate) * Math.round(x.receive_quantity));
            var discount_amount = (material_value * PoDetails.discount_percent) / 100;
            var total_gst = (material_value * Math.round(PoDetails.igst)) / 100;
            var material_amount_pay = material_value - discount_amount + total_gst;
            var Mdtl = {
              material: x.material.id,
              rate: Math.round(PoDetails.rate),
              quantity: Math.round(x.receive_quantity),
              discount_per: Math.round(PoDetails.discount_percent),
              discount_amount: discount_amount,
              igst: Math.round(PoDetails.igst),
              cgst: Math.round(PoDetails.cgst),
              sgst: Math.round(PoDetails.sgst),
              total_gst: Math.round(total_gst),
              material_value: material_value,
              material_amount_pay: Math.round(material_amount_pay)
            }
            this.material_details_list.push(Mdtl)
          }
        })
        // console.log(this.material_details_list)
        this.form.patchValue({
          grn: this.grn_details.id,
          vendor: this.grn_details.vendor.id,
          vendor_address: this.grn_details.vendor_address.id,
          company: this.grn_details.company.id,
        })
        this.visible_key = true;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.clearFormArray(pur_invoice_detail_control);
      this.material_details_list = [];
      this.visible_key = false;
      this.loading = LoadingState.Ready;
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  // purchase invoice deatils
  create_pur_invoice_detail(mat) {
    return this.formBuilder.group({
      material: [mat.material, Validators.required],
      rate: [mat.rate, Validators.required],
      quantity: [mat.quantity, Validators.required],
      discount_per: [mat.discount_per, Validators.required],
      discount_amount: [mat.discount_amount, Validators.required],
      igst: [mat.igst, Validators.required],
      cgst: [mat.cgst, Validators.required],
      sgst: [mat.sgst, Validators.required],
      total_gst: [mat.total_gst, Validators.required],
      material_value: [mat.material_value, Validators.required],
      material_amount_pay: [mat.material_amount_pay, Validators.required]
    });
  }

  add_pur_invoice_detail(mat) {
    const control = <FormArray>this.form.controls['pur_invoice_detail'];
    control.push(this.create_pur_invoice_detail(mat));
  }

  delete_pur_invoice_detail(index: number) {
    const control = <FormArray>this.form.controls['pur_invoice_detail'];
    control.removeAt(index);
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addPurchaseInvoice() {
    var amount_sum = 0;
    var gst_sum = 0;

    console.log(this.material_details_list);
    this.material_details_list.forEach(x => {
      this.add_pur_invoice_detail(x)
      amount_sum += x.material_amount_pay
      gst_sum += x.total_gst
    })
    this.form.patchValue({
      total_gst: gst_sum,
      total_amount: amount_sum
    })

    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.purchaseInvoiceService.addNewPurchaseInvoice(this.form.value).subscribe(
        response => {
          this.grnFinalize();
        },
        error => {
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  grnFinalize() {
    let d;
    d = {
      id: this.grn_details.id,
      is_finalised: 1
    };
    this.grnService.FinalizeGrn(d).subscribe(
      response => {
        // console.log(response)
        this.loading = LoadingState.Ready;
        this.toastr.success('Purchase invoice added successfully', '', {
          timeOut: 3000,
        });
        this.goToList('purchase-invoice');
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  reSet() {
    this.form.reset();
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
