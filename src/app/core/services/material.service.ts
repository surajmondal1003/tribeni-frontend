import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class MaterialService {

  constructor(private http: HttpClient) { }

  addNewMaterial(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'material_master/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_material_master/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialListByMaterialTypeAndProject(project_id,materialType_id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_project_material/'+project_id+'/'+materialType_id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialListByMaterialType(materialType_id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_materialtype_material/'+materialType_id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getMaterialDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'material_master/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateMaterial(data,material): Observable<any>{
    return this.http.put(environment.apiEndpoint+'material_master/'+material.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteMaterial(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'material_master/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
