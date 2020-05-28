import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { MaterialGroupService } from '../../../core/services/material-group.service';
import { MaterialService } from '../../../core/services/material.service';
import { UomService } from '../../../core/services/uom.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';



@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  @Output() showProjectList = new EventEmitter();
  form: FormGroup;
  companyProject;
  stateList = [];
  UOMList = [];
  uomValueList: any = [];
  materialTypeList: any = [];
  MaterialList = [];
  dynamicMaterialList = [];
  
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;


  lat:number;
  lng:number;

  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private materialGroupService: MaterialGroupService,
    private materialService: MaterialService,
    private uomService: UomService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService,

  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      company: [this.route.snapshot.params['id'], Validators.required],
      project_name: [null, Validators.required],
      description: [null],
      contact_person: [null],
      project_contact_no: [null],
      project_address: [null],
      project_state: [null],
      project_city: [null],
      project_pincode: [null],
      project_gstin: [null],
      project_details: this.formBuilder.array([this.createProjectDetail()])
    });

    this.companyProject = {
      company: this.route.snapshot.params['id'],
      project_name: '',
      description: '',
      contact_person: '',
      project_contact_no: null,
      project_address: '',
      project_state:'',
      project_city:'',
      project_pincode:'',
      project_gstin:'',
      project_details: [
        {
          materialtype: '',
          material: '',
          quantity: '',
          rate: '',
          boq_ref: '',
          uom: ''
        }
      ]
    }
    
    this.uomValueList = [
      {
        id: ''
      }
    ]
   
    this.getUOMList();
    this.getMaterialTypeList();
    this.getStateList();
    this.getHelp();
  }

 

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.projectAdd.heading;
      this.help_description = res.data.projectAdd.desc;
    })
  }

  getMaterialTypeList() {
    this.materialGroupService.getMaterialGroupListWithoutPagination().subscribe(res => {
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

  createProjectDetail() {
    return this.formBuilder.group({
      materialtype: ['', Validators.required],
      material: ['', Validators.required],
      quantity: ['', Validators.required],
      uom: [{ value: null, disabled: true }],
      rate: ['', Validators.required],
      boq_ref: ['', Validators.required],
    });
  }

  addProjectDetail() {

    var project_details_obj = {
      materialtype: '',
      material: '',
      quantity: '',
      rate:'',
      boq_ref:'',
      uom: ''
    }
    this.companyProject.project_details.push(project_details_obj)

    const control = <FormArray>this.form.controls['project_details'];
    control.push(this.createProjectDetail());
    var d = { id: '' };
    this.uomValueList.push(d);
  }

  deleteProjectDetail(index: number) {
    if (index > -1) {
      this.companyProject.project_details.splice(index, 1)
    }
    const control = <FormArray>this.form.controls['project_details'];
    control.removeAt(index);
    this.uomValueList.splice(index, 1)
    this.dynamicMaterialList.splice(index, 1)
  }

  changeMaterialType(id,i) {
    if (id > 0) {
      this.getMaterialListByMaterialType(id,i);
    }
  }

  changeMaterial(id, i) {
    this.materialService.getMaterialDetails(id).subscribe(res => {
      this.uomValueList[i]['id'] = res.material_uom[0].base_uom;
    })
  }

  getMaterialListByMaterialType(materialType_id,i) {
    this.materialService.getMaterialListByMaterialType(materialType_id).subscribe(
      (data: any[]) => {
        this.companyProject.project_details[i].material='';
        this.companyProject.project_details[i].quantity='';
        this.companyProject.project_details[i].rate='';
        this.companyProject.project_details[i].boq_ref='';
       
        var projectDetailArr =  this.companyProject.project_details;
              
        var filteredData  = data.filter(function(data_el){
          return projectDetailArr.filter(function(project_details_el){
             return project_details_el.material == data_el.id;
          }).length == 0
        });
        this.dynamicMaterialList.splice(i, 1, filteredData)
      }
    );
  }

  getProjectDetail(form) {
    return form.get('project_details').controls
  }

  addNewCompanyProject() {
    console.log(this.companyProject);
    console.log(this.form.value);
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.companyService.addNewCompanyProject(this.form.value).subscribe(
        response => {
          this.toastr.success('Project added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.showProjectList.emit();
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

  btnClickNav() {
    this.showProjectList.emit();
  };

  getStateList() {
    this.statesService.getStateActiveList().subscribe(
      (data: any[]) => {
        this.stateList = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  reSet() {
    this.form.reset();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

}
