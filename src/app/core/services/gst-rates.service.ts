import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class GstRatesService {

  constructor(private http: HttpClient) { }

  addNewGST(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'gst_rates/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGSTList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'gst_rates/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getGSTListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'gst_rates_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getGSTDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'gst_rates/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateGST(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'gst_rates/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveGST(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'gst_rates/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteGST(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'gst_rates/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
