import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UomService {

  constructor(private http: HttpClient) { }

  addNewUom(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'uom/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getUomList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'uom/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getUomListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'uom_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getUomDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'uom/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateUom(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'uom/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveUom(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'uom/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteUom(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'uom/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
