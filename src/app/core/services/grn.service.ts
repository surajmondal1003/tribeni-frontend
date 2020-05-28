import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class GrnService {

  constructor(private http: HttpClient) { }

  addNewGrn(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'grn/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGrnList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_grn/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }  
  
  getGrnListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'grn_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGrnDisapproveListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'grn_dropdown_nonapproval/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPrevGrnList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_order_grn/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGrnDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_grn/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateGrn(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'grn/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveGrn(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'grn_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  approveDisapproveGrn(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'grn_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  FinalizeGrn(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'grn_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
