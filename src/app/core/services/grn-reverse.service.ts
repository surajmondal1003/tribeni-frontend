import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class GrnReverseService {

  constructor(private http: HttpClient) { }

  addNewReverseGrn(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'reversegrn/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getReverseGrnList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_reversegrn/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPrevReverseGrnList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'previous_reverse_grn/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
    

  getReverseGrnDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_reversegrn/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  approveDisapproveReverseGrn(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'reversegrn_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
