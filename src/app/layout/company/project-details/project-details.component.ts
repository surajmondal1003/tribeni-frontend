import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() companyProjectId: number;
  @Output() showProjectList = new EventEmitter();
  loading: LoadingState = LoadingState.NotReady;


  company_project;
  help_heading = "";
  help_description = "";
  visible_key: boolean;
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
    private helpService: HelpService
  ) { }

  ngOnInit() {
    console.log(this.companyProjectId);  
    
    this.company_project ={
      project_name:"aaaa",
    }
    this.getCompanyProjectDetails(this.companyProjectId);
  }
  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.projectDetails.heading;
      this.help_description = res.data.projectDetails.desc;
    })
  }

  getCompanyProjectDetails(id) {
    this.companyService.getCompanyProjectDetails(id).subscribe(
      (data: any[]) => {
        console.log(data)
        this.company_project = data;
       
        this.visible_key = true;
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
  btnClickNav() {
    this.showProjectList.emit();
  };
}


