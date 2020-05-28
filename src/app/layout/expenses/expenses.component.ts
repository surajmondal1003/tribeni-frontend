import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../../core/services/expenses.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenseList = [];  
  defaultPagination: number;
  totalExpensesList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  constructor(
    //private expensesService: ExpensesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    // this.spinner.show();
    // this.itemNo = 0;
    // this.defaultPagination = 1;
    // this.getExpensesList();
    // this.getHelp();
  }

  // getHelp() {
  //   this.helpService.getHelp().subscribe(res => {
  //     this.help_heading = res.data.expenses.heading;
  //     this.help_description = res.data.expenses.desc;
  //   })
  // }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    // this.getExpensesList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  // getExpensesList = function () {
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('page', this.defaultPagination.toString());
  //   params.set('search', this.search_key.toString());
  //   this.expensesService.getExpensesList(params).subscribe(
  //     (data: any[]) => {
  //       this.totalExpensesList = data['count'];
  //       this.expensesList = data['results'];
  //       this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
  //       this.lower_count = this.itemNo + 1;
  //       if(this.totalExpensesList > Globals.pageSize*this.defaultPagination){
  //         this.upper_count = Globals.pageSize*this.defaultPagination
  //       }
  //       else{
  //         this.upper_count = this.totalExpensesList
  //       }
  //       this.spinner.hide();
  //       // console.log(data)
  //     }
  //   );
  // };

  // activeExpenses = function (id) {
  //   this.spinner.show();
  //   let expenses;

  //   expenses = {
  //     id: id,
  //     status: true
  //   };
  //   this.expensesService.activeInactiveExpenses(expenses).subscribe(
  //     response => {
  //       this.toastr.success('Status changed successfully', '', {
  //         timeOut: 3000,
  //       });
  //       this.getExpensesList();
  //     },
  //     error => {
  //       console.log('error', error)
  //       // this.toastr.error('everything is broken', '', {
  //       //   timeOut: 3000,
  //       // });
  //     }
  //   );
  // };

  // inactiveExpenses = function (id) {
  //   this.spinner.show();
  //   let expenses;

  //   expenses = {
  //     id: id,
  //     status: false
  //   };

  //   this.expensesService.activeInactiveExpenses(expenses).subscribe(
  //     response => {
  //       this.toastr.success('Status changed successfully', '', {
  //         timeOut: 3000,
  //       });
  //       this.getExpensesList();
  //     },
  //     error => {
  //       console.log('error', error)
  //       // this.toastr.error('everything is broken', '', {
  //       //   timeOut: 3000,
  //       // });
  //     }
  //   );
  // };

  // deleteExpenses = function (id) {
  //   this.spinner.show();
  //   let expenses;

  //   expenses = {
  //     id: id
  //   };

  //   this.expensesService.deleteExpenses(expenses).subscribe(
  //     response => {
  //       this.toastr.success('Expense deleted successfully', '', {
  //         timeOut: 3000,
  //       });
  //       this.getExpensesList();
  //     },
  //     error => {
  //       console.log('error', error)
  //       // this.toastr.error('everything is broken', '', {
  //       //   timeOut: 3000,
  //       // });
  //     }
  //   );
  // };

  pagination = function () {
    this.spinner.show();
    this.getExpensesList();
  };
}
