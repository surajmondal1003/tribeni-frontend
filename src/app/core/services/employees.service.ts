import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  addNewEmployee(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'create_user/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_employee/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'employee_dropdwon/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getEmployeeDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'employee/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateEmployee(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'employee/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveEmployee(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'employee/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteEmployee(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'employee/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  addEmployeesAttendance(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'attendance/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeAttendanceDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'attendance/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateEmployeeAttendance(id,data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'attendance/'+id+'/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeAttendanceList(id,params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'emp_attendance/'+id+'/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getContentDropdown(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'app_approve/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeModuleActivateList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_emp_approve/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  addModuleActivatePermission(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'emp_approve/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeModuleActivateDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_emp_approve/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }


  updateModuleActivatePermission(data): Observable<any> {
    return this.http.put(environment.apiEndpoint + 'emp_approve/'+data.id+'/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('logedUserToken'))
    })
  }
  

  
}
