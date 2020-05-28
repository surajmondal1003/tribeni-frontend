import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TermsConditionService {

  constructor(private http: HttpClient) { }

  addNewTerms(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'terms_conditions/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getTermsList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'terms_conditions/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  getTermsListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'terms_conditions_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getTermsDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'terms_conditions/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateTerms(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'terms_conditions/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveTerms(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'terms_conditions/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteTerms(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'terms_conditions/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
