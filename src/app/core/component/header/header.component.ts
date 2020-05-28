import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pushRightClass: string = 'push-right';
  logedUser;
  constructor(
    public router: Router,
    private permissionsService: NgxPermissionsService
  ) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.logedUser = localStorage.getItem('logedUser');
  }


  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('logedUserEmail');
    localStorage.removeItem('logedUserToken');
    localStorage.removeItem('logedUserUserId');
    localStorage.removeItem('logedUserUserName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('logedUser');
  }


}
