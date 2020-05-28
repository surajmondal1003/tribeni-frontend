import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReportsService {

  constructor(private http: HttpClient) { }

  getRequisitionReportList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_requistion_search/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrderReportList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_order_search/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGrnReportList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'grn_search/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPaymentReportList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'payment_search/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
