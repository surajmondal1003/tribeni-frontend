import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstRatesService } from '../../../core/services/gst-rates.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-gst-rates-add',
  templateUrl: './gst-rates-add.component.html',
  styleUrls: ['./gst-rates-add.component.scss']
})
export class GstRatesAddComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private gstRatesService: GstRatesService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      gst_pattern: new FormControl('', Validators.required),
      igst: new FormControl(0, Validators.required),
      cgst: new FormControl('', Validators.required),
      sgst: new FormControl('', Validators.required)
    });
    this.getHelp();    
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.gstAdd.heading;
      this.help_description = res.data.gstAdd.desc;
      this.loading = LoadingState.Ready;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };


  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  GetIgst(cgst, sgst){    
    if(cgst != "" && sgst != ""){
      this.form.patchValue({
        igst: parseFloat(cgst) + parseFloat(sgst)
      })
    }
  }
  addNewGstRate() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.gstRatesService.addNewGST(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('GST rates added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('gst-rates');
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

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }
}
