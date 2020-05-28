import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../../core/services/expenses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-expenses-add',
  templateUrl: './expenses-add.component.html',
  styleUrls: ['./expenses-add.component.scss']
})

export class ExpensesAddComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      company: ['', Validators.required],
      employee_name: ['', Validators.required],
      expense_amount: ['', Validators.required],
      expense_purpose: ['', Validators.required]
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

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  reSet() {
    this.form.reset();
  }

  addNewExpense(){
    
  }

}
