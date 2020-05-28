import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class DesignationsService {

  constructor(private http: HttpClient) { }

  addNewDesignation(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'designation/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDesignationList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_designation/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDesignationDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'designation/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDesignationListByDept(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'designation_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateDesignation(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'designation/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveDesignation(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'designation_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteDesignation(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'designation_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
