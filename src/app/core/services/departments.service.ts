import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  addNewDepartment(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'departments/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDepartmentList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_departments/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDepartmentListByCompany(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_departments/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getDepartmentDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_departments/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateDepartment(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'departments_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveDepartment(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'departments_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteDepartment(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'departments_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
