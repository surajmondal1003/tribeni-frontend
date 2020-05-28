import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }

  addNewStock(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'stock/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  addNewStockIssue(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'stock_issue/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStockList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_stock/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStockIssueHistoryList(params,id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_stock_issue/'+id+'/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStockDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_stock/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateStock(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'stock/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
