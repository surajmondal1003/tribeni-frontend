import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class MaterialGroupService {

  constructor(private http: HttpClient) { }

  addNewMaterialGroup(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_material_type/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialGroupList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_material_type/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialGroupListByProject(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_project_materialtype/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialGroupListWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_material_type_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getMaterialGroupDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_material_type/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateMaterialGroup(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_material_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveMaterialGroup(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_material_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteMaterialGroup(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_material_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
