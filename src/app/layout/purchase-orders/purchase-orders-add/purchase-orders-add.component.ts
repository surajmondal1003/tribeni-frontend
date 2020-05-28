import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../core/services/company.service';
import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { MaterialService } from '../../../core/services/material.service';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { VendorService } from '../../../core/services/vendor.service';
import { TermsConditionService } from '../../../core/services/terms-condition.service';
import { GstRatesService } from '../../../core/services/gst-rates.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

declare var require: any;
var converter = require('number-to-words');

@Component({
  selector: 'app-purchase-orders-add',
  templateUrl: './purchase-orders-add.component.html',
  styleUrls: ['./purchase-orders-add.component.scss']
})
export class PurchaseOrdersAddComponent implements OnInit {
  model: any;
  form: FormGroup;
  purchase_order_detail: any[] = [];
  purchase_order_freight: any[] = [];
  purchase_order_terms: any[] = [];
  requisition_list: any[] = [];
  vendor_list: any[] = [];
  requisition_details: any;
  vendor_address_list: any[] = [];
  visible_key: boolean;
  terms_condition_list: any[] = [];
  gst_rates_list: any[] = [];
  get_gst_deatils: any;
  material_details_list: any[] = [];
  sum: number = 0;
  previous_purchase_list: any[] = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private materialService: MaterialService,
    private companyService: CompanyService,
    private vendorService: VendorService,
    private termsConditionService: TermsConditionService,
    private gstRatesService: GstRatesService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      requisition: [null, Validators.required],
      quotation_no: ['', Validators.required],
      quotation_date: ['', Validators.required],
      company: ['', Validators.required],
      vendor: ['', Validators.required],
      vendor_address: ['', Validators.required],
      grand_total: [0, Validators.required],
      grand_total_words: ['', Validators.required],
      purchase_order_detail: this.formBuilder.array([]),
      purchase_order_freight: this.formBuilder.array([]),
      purchase_order_terms: this.formBuilder.array([]),
    });
    this.getRequisitionList();
    this.getVendorList();
    this.getTermsConditionList();
    this.getGstRatesList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrderAdd.heading;
      this.help_description = res.data.purchaseOrderAdd.desc;
    })
  }

  getRequisitionPurchaseOrderList(id) {
    this.purchaseRequisitionService.getPurchaseRequisitionOrderList(id).subscribe(res => {
      this.previous_purchase_list = res;
      // console.log(this.previous_purchase_list)
      const order_freight_control = <FormArray>this.form.controls['purchase_order_freight'];
      this.requisition_details.requisition_detail.forEach(x => {
        // console.log(x)
        var Mdtl = {
          igst: 0,
          cgst: 0,
          sgst: 0,
          material: x.material.id,
          gst_amount: 0,
          order_quantity: '',
          rate: '',
          discount_percent: 0,
          delivery_date: '',
          sub_total: ''
        }
        if (x.material.material_tax.length > 0) {
          Mdtl.igst = x.material.material_tax[0].igst;
          Mdtl.cgst = x.material.material_tax[0].cgst;
          Mdtl.sgst = x.material.material_tax[0].sgst;
        }
        this.material_details_list.push(Mdtl)
      })
      this.form.patchValue({
        company: this.requisition_details.company.id
      })
      if (this.requisition_details.requisition_detail.length > 0) {
        order_freight_control.push(this.create_purchase_order_freight());
        this.visible_key = true;
        this.loading = LoadingState.Ready;
      }
    }, error => {
      this.loading = LoadingState.Ready;
      this.toastr.error('Something went wrong', '', {
        timeOut: 3000,
      });
    })
  }

  getGstRatesList() {
    this.gstRatesService.getGSTListWithoutPagination().subscribe(res => {
      this.gst_rates_list = res;
    })
  }
  getTermsConditionList() {
    this.termsConditionService.getTermsListWithoutPagination().subscribe(res => {
      this.terms_condition_list = res;
    })
  }
  getVendorList() {
    this.vendorService.getVendorListWithoutPagination().subscribe(res => {
      this.vendor_list = res;
    })
  }
  getRequisitionList() {
    this.purchaseRequisitionService.getPurchaseRequisitionListWithoutPagination().subscribe(res => {
      this.requisition_list = res;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }
  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  vendorChange(id) {
    this.vendorService.getVendorDetails(id).subscribe(res => {
      this.vendor_address_list = res.vendor_address;
    })
  }
  requisitionChange(id) {
    this.loading = LoadingState.Processing;
    const order_freight_control = <FormArray>this.form.controls['purchase_order_freight'];
    const order_detail_control = <FormArray>this.form.controls['purchase_order_detail'];
    const order_terms_control = <FormArray>this.form.controls['purchase_order_terms'];
    if (id) {
      this.visible_key = false;
      this.clearFormArray(order_freight_control)
      this.requisition_details = '';
      this.material_details_list = [];
      this.sum = 0;
      this.form.patchValue({
        grand_total: this.sum
      })
      this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(res => {
        this.requisition_details = res;
        this.getRequisitionPurchaseOrderList(id);
        // console.log(this.requisition_details)
      })
    }
    else {
      this.clearFormArray(order_freight_control);
      this.clearFormArray(order_detail_control);
      this.clearFormArray(order_terms_control);
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

  // order deatils
  create_purchase_order_detail(mat) {
    return this.formBuilder.group({
      material: [mat.material.id, Validators.required],
      uom: [mat.uom.id, Validators.required],
      requisition_quantity: [mat.quantity, Validators.required],
      order_quantity: ['', Validators.required],
      rate: ['', Validators.required],
      material_value: ['', Validators.required],
      discount_percent: ['', Validators.required],
      discount_value: ['', Validators.required],
      igst: ['', Validators.required],
      cgst: ['', Validators.required],
      sgst: ['', Validators.required],
      gst_amount: ['', Validators.required],
      sub_total: ['', Validators.required],
      delivery_date: ['', Validators.required]
    });
  }

  add_purchase_order_detail(mat) {
    const control = <FormArray>this.form.controls['purchase_order_detail'];
    control.push(this.create_purchase_order_detail(mat));
  }

  delete_purchase_order_detail(index: number) {
    const control = <FormArray>this.form.controls['purchase_order_detail'];
    control.removeAt(index);
  }

  matCheck(val, mat) {
    if (val.currentTarget.checked) {
      this.add_purchase_order_detail(mat)
    } else {
      var index = this.form.value.purchase_order_detail.findIndex(p => p.material == mat.material.id)
      this.delete_purchase_order_detail(index)
    }
    this.sum = 0;
    this.material_details_list.forEach(x => {
      var Mindex = this.form.value.purchase_order_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        this.sum += Math.round(x.sub_total)
      }
    })
    this.sum += this.form.value.purchase_order_freight[0].freight_total
    this.form.patchValue({
      grand_total: this.sum,
      grand_total_words: converter.toWords(this.sum)
    })
  }
  getSubTotal(quantity, rate, discount, i) {
    var avl_qtn = Math.round(this.requisition_details.requisition_detail[i].avail_qty)
    if (Math.round(quantity) > avl_qtn) {
      this.material_details_list[i].order_quantity = avl_qtn
      this.toastr.error('Quantity should not be more than Rest Quantity', '', {
        timeOut: 3000,
      });
    }
    var project_Spc_rate = Math.round(this.requisition_details.requisition_detail[i].material_rate[0].rate);
    if (Math.round(rate) > project_Spc_rate) {
      this.material_details_list[i].rate = project_Spc_rate
      this.toastr.error('Rate should not be more than Project Specific Rate', '', {
        timeOut: 3000,
      });
    }
    var igst;
    if (this.requisition_details.requisition_detail[i].material.material_tax.length > 0) {
      igst = Math.round(this.requisition_details.requisition_detail[i].material.material_tax[0].igst)
    }
    else {
      igst = 0;
    }
    if (quantity != "" && rate != "" && discount != "") {
      var val = Math.round((rate * quantity) - ((rate * quantity * discount) / 100))
      var gst_amount = Math.round((val * igst) / 100)
      this.material_details_list[i].gst_amount = gst_amount
      this.material_details_list[i].sub_total = Math.round(val + gst_amount)
    }
    else if (quantity != "" && rate != "") {
      var val = Math.round((rate * quantity))
      var gst_amount = Math.round((val * igst) / 100)
      this.material_details_list[i].gst_amount = gst_amount
      this.material_details_list[i].sub_total = Math.round(val + gst_amount)
    }
    this.sum = 0;
    this.material_details_list.forEach(x => {
      var Mindex = this.form.value.purchase_order_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        this.sum += Math.round(x.sub_total)
      }
    })
    this.sum += this.form.value.purchase_order_freight[0].freight_total
    this.form.patchValue({
      grand_total: this.sum,
      grand_total_words: converter.toWords(this.sum)
    })

  }
  // freight list
  create_purchase_order_freight() {
    return this.formBuilder.group({
      freight_option: 1,
      vendor: null,
      freight_rate: 1,
      freight_amount: ['', Validators.required],
      freight_gst_rate: ['', Validators.required],
      freight_total: [0, Validators.required]
    });
  }

  getPurchaseOrderFreight(form) {
    return form.get('purchase_order_freight').controls
  }
  add_purchase_order_freight() {
    const control = <FormArray>this.form.controls['purchase_order_freight'];
    control.push(this.create_purchase_order_freight());
  }

  delete_purchase_order_freight(index: number) {
    const control = <FormArray>this.form.controls['purchase_order_freight'];
    control.removeAt(index);
  }

  // terms and conditions
  create_purchase_order_terms(id) {
    return this.formBuilder.group({
      po_terms: [id, Validators.required]
    });
  }

  add_purchase_order_terms(id) {
    const control = <FormArray>this.form.controls['purchase_order_terms'];
    control.push(this.create_purchase_order_terms(id));
  }

  delete_purchase_order_terms(index: number) {
    const control = <FormArray>this.form.controls['purchase_order_terms'];
    control.removeAt(index);
  }
  termsCheck(val, id) {
    if (val.currentTarget.checked) {
      this.add_purchase_order_terms(id)
    } else {
      var index = this.form.value.purchase_order_terms.findIndex(p => p.po_terms == id)
      this.delete_purchase_order_terms(index)
    }
  }
  getFreightTotal(rate, amount, gst, i) {
    if (rate != "" && amount != "" && gst != "") {
      if (gst > 0) {
        this.gstRatesService.getGSTDetails(gst).subscribe(res => {
          this.get_gst_deatils = res;
          var total = Math.round(Math.round(amount) + Math.round(this.get_gst_deatils.igst));
          this.form.value.purchase_order_freight[i].freight_total = total
          this.sum = 0;
          this.material_details_list.forEach(x => {
            var Mindex = this.form.value.purchase_order_detail.findIndex(p => p.material == x.material)
            if (Mindex > -1) {
              this.sum += Math.round(x.sub_total)
            }
          })
          this.sum += this.form.value.purchase_order_freight[i].freight_total
          this.form.patchValue({
            grand_total: this.sum,
            grand_total_words: converter.toWords(this.sum)
          })
        })

      }
    }
  }
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  addPurchaseOrder() {

    if (this.form.value.purchase_order_detail.length == 0) {
      this.toastr.error('Check atleast one item from list of item/s', '', {
        timeOut: 3000,
      });
      return;
    }
    const order_detail_control = <FormArray>this.form.controls['purchase_order_detail'];
    this.material_details_list.forEach(x => {
      var Mindex = this.form.value.purchase_order_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        var obj = this.material_details_list.filter(k => k.material == x.material)
        if (obj[0].rate == "" || obj[0].delivery_date == "") {
          this.toastr.error('All fields are required in every row ', '', {
            timeOut: 3000,
          });
          return;
        }
        var myDate = new Date(x.delivery_date.year, x.delivery_date.month - 1, x.delivery_date.day)
        var discount = 0
        if (x.discount_percent != '') {
          discount = x.discount_percent
        }
        order_detail_control.at(Mindex).patchValue({
          gst_amount: x.gst_amount,
          rate: x.rate,
          order_quantity: x.order_quantity,
          discount_percent: discount,
          discount_value: Math.round((x.rate * x.order_quantity) - (x.sub_total - x.gst_amount)),
          igst: x.igst,
          cgst: x.cgst,
          sgst: x.sgst,
          sub_total: x.sub_total,
          material_value: Math.round((x.rate * x.order_quantity)),
          delivery_date: myDate.toISOString()
        });
      }
    })
    if (this.form.valid) {
      var prv_tkn_qtn = 0;
      var po_qtn = 0;
      var pr_qtn = 0;
      this.form.value.purchase_order_detail.forEach(o => {
        po_qtn += Math.round(o.order_quantity)
        pr_qtn += Math.round(o.requisition_quantity)
      })
      this.previous_purchase_list.forEach(r => {
        r.purchase_order_detail.forEach(k => {
          prv_tkn_qtn += Math.round(k.order_quantity)
        })
      })
      if (pr_qtn == (prv_tkn_qtn + po_qtn)) {
        this.requisitionFinalize()
      }
      this.loading = LoadingState.Processing;
      var QtnDate = new Date(this.form.value.quotation_date.year, this.form.value.quotation_date.month - 1, this.form.value.quotation_date.day)
      this.form.patchValue({
        quotation_date: QtnDate.toISOString()
      })
      this.purchaseOrdersService.addNewPurchaseOrder(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Purchase order added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('purchase-orders');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  requisitionFinalize() {
    let d;
    d = {
      id: this.requisition_details.id,
      is_finalised: 1
    };
    this.purchaseRequisitionService.finalizePurchaseRequisition(d).subscribe(
      response => {
        // console.log(response)
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

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

  getAvailQty(val) {
    if (Math.round(val) > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}
