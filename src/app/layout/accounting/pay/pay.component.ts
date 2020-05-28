import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { PaymentService } from '../../../core/services/payment.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  payment;
  companyList = [];
  bankList = [];
  invoiceList = [];
  purchaseInvoiceId: number;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private companyService: CompanyService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      company: [{value: null, disabled: true}],
      pur_inv: [{value: null, disabled: true}],
      total_amount: [{value: null, disabled: true}],
      bank: [null, Validators.required],
      created_at: [null, Validators.required],
      payment_mode: [null, Validators.required],
      payment_refrence: [null, Validators.required],
      special_note: [null, Validators.required],
    });
    this.payment = {
      company: '',
      pur_inv: '',
      total_amount: '',
      bank: '',
      created_at: '',
      payment_mode: '',
      payment_refrence: '',
      special_note: '',
      po_order: '',
      po_order_no: '',
      purchase_inv_date: '',
      purchase_inv_no: '',
      is_paid: true
    };

    this.getCompanyDropdownList();
    this.getHelp();
    this.getPaymentDetails(this.route.snapshot.params['id']);
  }

  getPaymentDetails(id){
    this.paymentService.getPaymentDetails(id).subscribe(res => {
      console.log(res)
      this.payment = res;

      this.payment.company = res.company.id;
      this.payment.pur_inv = res.pur_inv_no.id;

      var date = new Date(this.payment.created_at)
      this.payment.created_at = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
      console.log( this.payment)

      this.getCompanyInvoiceList(this.payment.company);
      this.getCompanyBankList(this.payment.company);
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
      this.help_heading = res.data.paymentPay.heading;
      this.help_description = res.data.paymentPay.desc;
    })
  }

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;        
      }
    );
  };

  getCompanyBankList(id) {
    this.paymentService.getCompanyBankList(id).subscribe(
      (data: any[]) => {
        this.bankList = data;
        // console.log(this.bankList);
      }
    );
  };

  getCompanyInvoiceList(id) {
    this.paymentService.getCompanyInvoiceList(id).subscribe(
      (data: any[]) => {
        this.invoiceList = data;
        // console.log(this.invoiceList);
      }
    );
  };


  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  Payment() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      var date = new Date(this.form.value.created_at.year, this.form.value.created_at.month - 1, this.form.value.created_at.day)      
      this.payment.created_at = date.toISOString();
      this.payment.is_paid = true;
      this.paymentService.updatePayment(this.payment).subscribe(
        response => {
          this.purchaseInvoiceFinalize()
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

  purchaseInvoiceFinalize() {
    let d;
    d = {
      id: this.payment.pur_inv_no.id,
      is_finalised: 1
    };
    this.purchaseInvoiceService.finalizePurchaseInvoice(d).subscribe(
      response => {
        this.toastr.success('Payment successfully', '', {
          timeOut: 3000,
        });
        this.loading = LoadingState.Ready;
        this.goToList('accounting');
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

  reSet() {
    this.form.reset();
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
