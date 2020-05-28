import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class StatesService {

  constructor(private http: HttpClient) { }

  addNewState(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'states/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStateList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'states/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStateActiveList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'active_states/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStateDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'states/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateState(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'states/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveState(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'states/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteState(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'states/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
}
