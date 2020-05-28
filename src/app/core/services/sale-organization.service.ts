import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class SaleOrganizationService {

  constructor(private http: HttpClient) { }

  addNewSaleOrganization(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_sales_organization/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getSaleOrganizationList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_sales_organization/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getSaleOrganizationDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_sales_organization/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateSaleOrganization(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_sales_organization/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveSaleOrganization(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_sales_organization/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteSaleOrganization(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'all_sales_organization/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
