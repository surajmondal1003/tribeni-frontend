import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GrnService } from '../../../core/services/grn.service';
import { GrnReverseService } from '../../../core/services/grn-reverse.service';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-reverse-grn-add',
  templateUrl: './reverse-grn-add.component.html',
  styleUrls: ['./reverse-grn-add.component.scss']
})
export class ReverseGrnAddComponent implements OnInit {

  model: any;
  form: FormGroup;
  grnList: any = [];
  visible_key: boolean;
  material_details_list: any[] = [];
  grn_details: any;
  previous_reverse_grn_list: any[] = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private grnService: GrnService,
    private grnReverseService: GrnReverseService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      grn: ['', Validators.required],
      reverse_grn_detail: this.formBuilder.array([])
    });
    this.getHelp();
    this.getGrnList();
  }

  getGrnList() {
    this.grnService.getGrnDisapproveListWithoutPagination().subscribe(res => {
      this.grnList = res;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grnAdd.heading;
      this.help_description = res.data.grnAdd.desc;
    })
  }

  getPrevRevGrnList(id) {
    this.grnReverseService.getPrevReverseGrnList(id).subscribe(res => {
      this.previous_reverse_grn_list = res;
      this.grn_details.grn_detail.forEach(x => {
        var Mdtl = {
          material: x.material.id,
          rest_quantity: x.receive_quantity,
          reverse_grn_quantity: '',
          reverse_reason: ''
        }
        this.material_details_list.push(Mdtl)
      })
      this.form.patchValue({
        grn: this.grn_details.id
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


  grnChange(id) {
    this.loading = LoadingState.Processing;
    const reverse_grn_detail_control = <FormArray>this.form.controls['reverse_grn_detail'];
    if (id) {
      this.clearFormArray(reverse_grn_detail_control)
      this.grn_details = '';
      this.material_details_list = [];
      this.visible_key = false;
      this.grnService.getGrnDetails(id).subscribe(res => {
        this.grn_details = res;
        this.getPrevRevGrnList(id);
      },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        })
    }
    else {
      this.clearFormArray(reverse_grn_detail_control);
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
  create_reverse_grn_detail(mat) {
    return this.formBuilder.group({
      material: [mat.material.id, Validators.required],
      reverse_grn_quantity: ['', Validators.required],
      reverse_reason: ['', Validators.required]
    });
  }

  add_reverse_grn_detail(mat) {
    const control = <FormArray>this.form.controls['reverse_grn_detail'];
    control.push(this.create_reverse_grn_detail(mat));
  }

  delete_reverse_grn_detail(index: number) {
    const control = <FormArray>this.form.controls['reverse_grn_detail'];
    control.removeAt(index);
  }

  matCheck(val, mat) {
    if (val.currentTarget.checked) {
      this.add_reverse_grn_detail(mat)
    } else {
      var index = this.form.value.reverse_grn_detail.findIndex(p => p.material == mat.material.id)
      this.delete_reverse_grn_detail(index)
    }
  }

  RevGnrQuantity(reverse_grn_quantity, i) {
    var rest_qtn = Math.round(this.material_details_list[i].rest_quantity)
    if (Math.round(reverse_grn_quantity) > rest_qtn) {
      this.material_details_list[i].reverse_grn_quantity = rest_qtn
      this.toastr.error('Quantity should not be more than Rest quantity', '', {
        timeOut: 3000,
      });
    }
  }

  addReverseGrn() {
    if (this.form.value.reverse_grn_detail.length == 0) {
      this.toastr.error('Check atleast one item from list of item/s', '', {
        timeOut: 3000,
      });
      return;
    }
    const reverse_grn_detail_control = <FormArray>this.form.controls['reverse_grn_detail'];
    this.material_details_list.forEach(x => {
      var Mindex = this.form.value.reverse_grn_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        var obj = this.material_details_list.filter(k => k.material == x.material);
        if (obj[0].reverse_grn_quantity == "" || obj[0].reverse_reason == "") {
          this.toastr.error('All fields are required in selected row ', '', {
            timeOut: 3000,
          });
          return;
        }
        reverse_grn_detail_control.at(Mindex).patchValue({
          material: x.material,
          reverse_grn_quantity: x.reverse_grn_quantity,
          reverse_reason: x.reverse_reason
        });
      }
    })
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.grnReverseService.addNewReverseGrn(this.form.value).subscribe(
        response => {
          this.toastr.success('Reverse GNR added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('reverse-grn');
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
