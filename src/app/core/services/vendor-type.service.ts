import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class VendorTypeService {

  constructor(private http: HttpClient) { }

  addNewVendorType(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_vendor_type/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendorTypeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_vendor_type/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendorTypeListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_vendor_type_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendorTypeActiveList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'active_vendor_type/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendorTypeDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_vendor_type/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateVendorType(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_vendor_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveVendorType(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_vendor_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteVendorType(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_vendor_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

}
