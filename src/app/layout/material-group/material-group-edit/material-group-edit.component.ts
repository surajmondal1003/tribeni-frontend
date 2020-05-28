import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialGroupService } from '../../../core/services/material-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-material-group-edit',
  templateUrl: './material-group-edit.component.html',
  styleUrls: ['./material-group-edit.component.scss']
})
export class MaterialGroupEditComponent implements OnInit {
  materialGroup: any;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private materialGroupService: MaterialGroupService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      material_type: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.materialGroup = {
      id: '',
      material_type: '',
      description: ''
    };
    this.getMaterialGroupDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getMaterialGroupDetails(id) {
    this.materialGroupService.getMaterialGroupDetails(id).subscribe(
      (data: any[]) => {
        this.materialGroup = data;
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

  getHelp() {
    this.helpService.getHelp().subscribe(
      res => {
        this.help_heading = res.data.materialGroupEdit.heading;
        this.help_description = res.data.materialGroupEdit.desc;
      }
    )
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  updateMaterialGroup() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.materialGroupService.updateMaterialGroup(this.materialGroup).subscribe(
        response => {
          this.toastr.success('Material group updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('material-group');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  reSet() {
    this.form.reset();
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
