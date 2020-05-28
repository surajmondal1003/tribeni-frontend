import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class BanksService {

  constructor(private http: HttpClient) { }

  addNewBank(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'banks/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getBankList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_bank/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getBankDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'banks/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateBank(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'banks/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveBank(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'banks/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteBank(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'banks/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
