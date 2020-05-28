import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PurchaseInvoiceService {

  constructor(private http: HttpClient) { }

  addNewPurchaseInvoice(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'purchase_invoice/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseInvoiceList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'all_purchase_invoice/?' + params, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }


  getPurchaseInvoiceDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'all_purchase_invoice/' + id + '/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  updatePurchaseInvoice(data): Observable<any> {
    return this.http.put(environment.apiEndpoint + 'purchase_invoice/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  activeInactivePurchaseInvoice(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'purchase_invoice_status/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  approveDisapprovePurchaseInvoice(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'purchase_invoice_status/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  finalizePurchaseInvoice(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'purchase_invoice_status/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

}
