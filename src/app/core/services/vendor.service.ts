import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class VendorService {

  constructor(private http: HttpClient) { }

  addNewVendor(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'vendor_master/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getVendorList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'all_vendor/?' + params, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getVendorListWithoutPagination(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'vendor_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }  

  getVendorDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'all_vendor/' + id + '/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  updateVendor(data): Observable<any> {
    return this.http.put(environment.apiEndpoint + 'vendor_master/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveVendor(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'vendor_master_status/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  deleteVendor(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'vendor_master_status/' + data.id + '/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

}
