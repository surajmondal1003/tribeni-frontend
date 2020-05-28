import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PurchaseOrdersService {

  constructor(private http: HttpClient) { }

  addNewPurchaseOrder(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'purchase_order/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrderList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_order/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPurchaseOrderListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_order_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getPurchaseOrderDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_order/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updatePurchaseOrder(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'purchase_order/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactivePurchaseOrder(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_order_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  approveDisapprovePurchaseOrder(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_order_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  finalizePurchaseOrder(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_order_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
