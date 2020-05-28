import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  constructor(private router: Router,private loginService: LoginService,) { }

 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{

    var query_token = route.queryParams.token;
    
    if (localStorage.getItem('isLoggedin')) {
      return Observable.of(true);
    }

    if (query_token != undefined) {
      var data = {
        token: query_token
      }
      this.loginService.loginByToken(data).subscribe(
        response => {

          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('logedUserEmail', response.email);
          localStorage.setItem('logedUserToken', response.token);
          localStorage.setItem('logedUserUserId', response.user_id);
          localStorage.setItem('logedUserUserName', response.username);
          localStorage.setItem('logedUser', response.first_name+' '+response.last_name);
          localStorage.setItem('userRole', response.user_type);
          localStorage.setItem('approve_details', JSON.stringify(response.approve_details));
          
          var url = state.url; 
          var urlParts= url.split('?');   
          //console.log(navExtras);
          this.router.navigate([urlParts[0]]);
          return Observable.of(false);

        },
        error => {
          this.router.navigate(['/login']);
          return Observable.of(false);
        }
      )
    }

    this.router.navigate(['/login']);
    return Observable.of(false);
  }

}
