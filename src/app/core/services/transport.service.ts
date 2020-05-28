import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TransportService {

  constructor(private http: HttpClient) { }

  addNewTransporter(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'transporter/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getTransporterList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'transporter/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getTransporterDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'transporter/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateTransporter(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'transporter/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveTransporter(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'transporter/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteTransporter(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'transporter/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
