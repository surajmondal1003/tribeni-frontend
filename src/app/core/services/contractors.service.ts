import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContractorsService {

  constructor(private http: HttpClient) { }

  addNewContractor(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'contractor_master/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getContractorList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'all_contractor/?' + params, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getContractorListWithoutPagination(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'contractor_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getContractorDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'contractor_master/' + id + '/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  updateContractor(data): Observable<any> {
    return this.http.put(environment.apiEndpoint + 'contractor_master/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveContractor(data): Observable<any> {
    return this.http.patch(environment.apiEndpoint + 'contractor_master_status/' + data.id + '/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  deleteContractor(data): Observable<any> {
    return this.http.delete(environment.apiEndpoint + 'contractor_master/' + data.id + '/', {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }
}
