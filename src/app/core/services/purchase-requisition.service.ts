import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PurchaseRequisitionService {

  constructor(private http: HttpClient) { }

  addNewPurchaseRequisition(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'purchase_requistion/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseRequisitionList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_requistion/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPreviousPurchaseRequisitionListByProject(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_requistion_by_project/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPurchaseRequisitionListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_requistion_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseRequisitionDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_requistion/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseRequisitionOrderList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'requisition_purchase_order/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updatePurchaseRequisition(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'purchase_requistion/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  changeStatusPurchaseRequisition(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_requistion_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  changeApproveStatusPurchaseRequisition(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_requistion_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  finalizePurchaseRequisition(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'purchase_requistion_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
