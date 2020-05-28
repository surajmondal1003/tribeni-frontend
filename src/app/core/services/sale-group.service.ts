import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class SaleGroupService {

  constructor(private http: HttpClient) { }

  addNewSaleGroup(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_sales_group/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getSaleGroupList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_sales_group/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getSaleGroupDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_sales_group/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateSaleGroup(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_sales_group/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveSaleGroup(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_sales_group/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteSaleGroup(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'all_sales_group/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
