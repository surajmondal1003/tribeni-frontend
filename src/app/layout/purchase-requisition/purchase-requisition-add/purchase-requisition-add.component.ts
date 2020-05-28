import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { CompanyService } from '../../../core/services/company.service';
import { MaterialGroupService } from '../../../core/services/material-group.service';
import { MaterialService } from '../../../core/services/material.service';
import { UomService } from '../../../core/services/uom.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';
import * as _ from "lodash";

@Component({
  selector: 'app-purchase-requisition-add',
  templateUrl: './purchase-requisition-add.component.html',
  styleUrls: ['./purchase-requisition-add.component.scss']
})
export class PurchaseRequisitionAddComponent implements OnInit {
  form: FormGroup;
  items: FormArray;
  UOMList: any = [];
  uomValueList: any = [];
  CompanyList: any = [];
  projectList: any = [];
  materialTypeList: any = [];
  projectMaterialList: any = []
  dynamicMaterialList: any = [];
  projectSpcQuantity: any = [];
  prevPurchaseRequisition: any = [];
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseRequisitionService: PurchaseRequisitionService,
    private materialService: MaterialService,
    private companyService: CompanyService,
    private materialGroupService: MaterialGroupService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private helpService: HelpService,
    private uomService: UomService
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      project: ['', Validators.required],
      company: ['', Validators.required],
      created_at: ['', Validators.required],
      special_note: ['', Validators.required],
      requisition_detail: this.formBuilder.array([this.createRequisitionDetail()])
    });

    this.uomValueList = [
      {
        id: ''
      }
    ]

    this.projectSpcQuantity = [
      {
        mat_id: '',
        spc_qtn: '',
        avl_qtn: '',
        qtn: ''
      }
    ]

    this.getUOMList();
    this.getCompanyList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisitionAdd.heading;
      this.help_description = res.data.purchaseRequisitionAdd.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.CompanyList = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  getProjectListBycompany(id) {
    this.companyService.getCompanyProjectDropdownList(id).subscribe(res => {
      this.projectList = res;
    })
  }

  getMaterialTypeListByProject(id) {
    this.materialGroupService.getMaterialGroupListByProject(id).subscribe(res => {
      this.materialTypeList = res;
    })
  }

  getUOMList() {
    this.uomService.getUomListWithoutPagination().subscribe(
      (data: any[]) => {
        this.UOMList = data;
      }
    );
  };

  getMaterialListByMaterialTypeAndProject(project_id, materialType_id, i) {
    this.materialService.getMaterialListByMaterialTypeAndProject(project_id, materialType_id).subscribe(
      (data: any[]) => {
        var projectDetailArr = this.projectSpcQuantity;
        var filteredData = data.filter(data_el => {
          return projectDetailArr.filter(project_details_el => {
            return project_details_el.mat_id == data_el.id;
          }).length == 0
        });
        this.dynamicMaterialList.splice(i, 1, filteredData)
      }
    );
  }

  getPreviousPurchaseRequisition(id) {
    this.purchaseRequisitionService.getPreviousPurchaseRequisitionListByProject(id).subscribe(res => {
      this.prevPurchaseRequisition = res;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  changeCompany(id) {
    if (id > 0) {
      this.getProjectListBycompany(id);
    }
  }

  changePoject(id) {
    if (id > 0) {
      this.loading = LoadingState.Processing;
      this.companyService.getCompanyProjectDetails(id).subscribe(res => {
        this.projectMaterialList = res.project_details;
        this.getPreviousPurchaseRequisition(id);
      })
      this.getMaterialTypeListByProject(id);
    }
  }

  changeMaterialType(id, i) {
    if (id > 0) {
      this.getMaterialListByMaterialTypeAndProject(this.form.value.project, id, i);
      this.projectSpcQuantity[i]['mat_id'] = '';
      this.projectSpcQuantity[i]['spc_qtn'] = '';
      this.projectSpcQuantity[i]['avl_qtn'] = '';
      this.projectSpcQuantity[i]['qtn'] = '';
    }
  }

  changeMaterial(id, i) {
    if (id > 0) {
      this.materialService.getMaterialDetails(id).subscribe(res => {
        this.uomValueList[i]['id'] = res.material_uom[0].base_uom;
      })
      var material_type = this.form.value.requisition_detail[i].material_type;
      var material = this.form.value.requisition_detail[i].material;
      var sum = 0;
      var spcf_qtn = 0;
      var d;
      var obj = this.projectMaterialList.filter(x => x.material.id == material && x.materialtype.id == material_type)
      if (obj != undefined) {
        d = { mat_id: material, spc_qtn: obj[0].quantity, avl_qtn: obj[0].avail_qty, qtn: '' }
        this.projectSpcQuantity.splice(i, 1, d);
      }
    }
  }

  createRequisitionDetail() {
    return this.formBuilder.group({
      material_type: ['', Validators.required],
      material: ['', Validators.required],
      spc_quantity: [{ value: null, disabled: true }],
      avl_qtn: [{ value: null, disabled: true }],
      quantity: ['', Validators.required],
      uom: [{ value: null, disabled: true }]
    });
  }

  getRequisitionDetail(form) {
    return form.get('requisition_detail').controls
  }

  addRequisitionDetail() {
    const control = <FormArray>this.form.controls['requisition_detail'];
    control.push(this.createRequisitionDetail());
    var d = { id: '' };
    this.uomValueList.push(d);
    var q = { mat_id: '', spc_qtn: '', avl_qtn: '', qtn: '' }
    this.projectSpcQuantity.push(q);
  }

  deleteRequisitionDetail(index: number) {
    const control = <FormArray>this.form.controls['requisition_detail'];
    control.removeAt(index);
    this.uomValueList.splice(index, 1)
    this.dynamicMaterialList.splice(index, 1)
    this.projectSpcQuantity.splice(index, 1)
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getExactQuantity(val, i) {
    var avl_val = Math.round(this.projectSpcQuantity[i]['avl_qtn'])
    if (val > avl_val) {
      this.projectSpcQuantity[i]['qtn'] = avl_val
      this.toastr.error('Quantity should not be more than Available Quantity', '', {
        timeOut: 3000,
      });
    }
  }

  addPurchaseRequisition() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      const requisition_detail_control = <FormArray>this.form.controls['requisition_detail'];
      for (var i = 0; i < this.uomValueList.length; i++) {
        var x = this.uomValueList[i]
        this.form.value.requisition_detail[i]['uom'] = x.id
      }
      var createdAt = new Date(this.form.value.created_at.year, this.form.value.created_at.month - 1, this.form.value.created_at.day)
      this.form.patchValue({
        created_at: createdAt.toISOString()
      })
      this.purchaseRequisitionService.addNewPurchaseRequisition(this.form.value).subscribe(
        response => {
          this.toastr.success('Purchase requisition added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('purchase-requisition');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      )

    } else {
      this.markFormGroupTouched(this.form)
    }

  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }




}
