import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GrnService } from '../../../core/services/grn.service';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-grn-add',
  templateUrl: './grn-add.component.html',
  styleUrls: ['./grn-add.component.scss']
})
export class GrnAddComponent implements OnInit {
  model: any;
  form: FormGroup;
  grn_detail: any[] = [];
  purchaseOrderList: any[] = [];
  visible_key: boolean;
  material_details_list: any[] = [];
  purchase_order_details: any;
  previous_grn_list: any[] = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private grnService: GrnService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      po_order: ['', Validators.required],
      company: ['', Validators.required],
      vendor: ['', Validators.required],
      vendor_address: ['', Validators.required],
      waybill_no: ['', Validators.required],
      vehicle_no: ['', Validators.required],
      check_post: ['', Validators.required],
      challan_no: ['', Validators.required],
      challan_date: ['', Validators.required],
      grn_detail: this.formBuilder.array([])
    });
    this.getPurchaseOrderList()
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grnAdd.heading;
      this.help_description = res.data.grnAdd.desc;
    })
  }

  getPrevGrnList(id) {
    this.grnService.getPrevGrnList(id).subscribe(res => {
      this.previous_grn_list = res;
      this.purchase_order_details.purchase_order_detail.forEach(x => {
        var Mdtl = {
          material: x.material.id,
          uom: x.uom,
          order_quantity: x.order_quantity,
          rest_quantity: x.avail_qty,
          margin: x.material.margin,
          receive_quantity: ''
        }
        this.material_details_list.push(Mdtl)
      })
      this.form.patchValue({
        po_order: this.purchase_order_details.id,
        company: this.purchase_order_details.company.id,
        vendor: this.purchase_order_details.vendor.id,
        vendor_address: this.purchase_order_details.vendor_address.id,
      })
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

  getPurchaseOrderList() {
    this.purchaseOrdersService.getPurchaseOrderListWithoutPagination().subscribe(res => {
      this.purchaseOrderList = res;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  purchaseOrderChange(id) {
    this.loading = LoadingState.Processing;
    const grn_detail_control = <FormArray>this.form.controls['grn_detail'];
    if (id) {
      this.clearFormArray(grn_detail_control)
      this.purchase_order_details = '';
      this.material_details_list = [];
      this.visible_key = false;
      this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(res => {
        this.purchase_order_details = res;
        // console.log(this.purchase_order_details)
        this.getPrevGrnList(id);
      },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        })
    }
    else {
      this.clearFormArray(grn_detail_control);
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
  // gnr deatils
  create_grn_detail(mat) {
    return this.formBuilder.group({
      material: [mat.material.id, Validators.required],
      uom: [mat.uom, Validators.required],
      receive_quantity: ['', Validators.required],
      order_quantity: [mat.order_quantity, Validators.required]
    });
  }

  add_grn_detail(mat) {
    const control = <FormArray>this.form.controls['grn_detail'];
    control.push(this.create_grn_detail(mat));
  }

  delete_grn_detail(index: number) {
    const control = <FormArray>this.form.controls['grn_detail'];
    control.removeAt(index);
  }

  matCheck(val, mat) {
    if (val.currentTarget.checked) {
      this.add_grn_detail(mat)
    } else {
      var index = this.form.value.grn_detail.findIndex(p => p.material == mat.material.id)
      this.delete_grn_detail(index)
    }
  }

  GnrQuantity(receive_quantity, i) {
    var rest_qtn = Math.round(this.material_details_list[i].rest_quantity)
    var margn = Math.round(this.material_details_list[i].margin)
    var expected_qtn = Math.round(rest_qtn + (rest_qtn * margn / 100))
    if (Math.round(receive_quantity) > expected_qtn) {
      this.material_details_list[i].receive_quantity = expected_qtn
      this.toastr.error('Quantity should not be more than Rest quantity', '', {
        timeOut: 3000,
      });
    }
  }
  addGrn() {
    if (this.form.value.grn_detail.length == 0) {
      this.toastr.error('Check atleast one item from list of item/s', '', {
        timeOut: 3000,
      });
      return;
    }
    const grn_detail_control = <FormArray>this.form.controls['grn_detail'];
    this.material_details_list.forEach(x => {
      var Mindex = this.form.value.grn_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        var obj = this.material_details_list.filter(k => k.material == x.material);
        if (obj[0].receive_quantity == "") {
          this.toastr.error('GRN quantity is required in every selected row ', '', {
            timeOut: 3000,
          });
          return;
        }
        grn_detail_control.at(Mindex).patchValue({
          material: x.material,
          order_quantity: x.order_quantity,
          receive_quantity: x.receive_quantity
        });
      }
    })

    if (this.form.valid) {
      var i = 0;
      this.material_details_list.forEach(m => {
        if (m.rest_quantity <= 0) {
          i++;
        }
        else {
          var mgn = Math.round((m.rest_quantity * m.margin) / 100);
          var min = Math.round(m.rest_quantity) - mgn;
          var max = Math.round(m.rest_quantity) + mgn;
          var obj = this.form.value.grn_detail.filter(k => k.material == m.material)
          if (obj.length > 0 && min <= obj[0].receive_quantity && max >= obj[0].receive_quantity) {
            i++;
          }
        }
      })
      if (this.material_details_list.length == i) {
        this.orderFinalize();
      }
      // console.log(this.form.value)
      this.loading = LoadingState.Processing;
      var challanDate = new Date(this.form.value.challan_date.year, this.form.value.challan_date.month - 1, this.form.value.challan_date.day)
      this.form.patchValue({
        challan_date: challanDate.toISOString()
      })
      // console.log(this.form.value)
      this.grnService.addNewGrn(this.form.value).subscribe(
        response => {
          this.toastr.success('GNR added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('grn');
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

  orderFinalize() {
    let d;
    d = {
      id: this.purchase_order_details.id,
      is_finalised: 1
    };
    this.purchaseOrdersService.finalizePurchaseOrder(d).subscribe(
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

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
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

  getAvailQty(val) {
    if (Math.round(val) > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
