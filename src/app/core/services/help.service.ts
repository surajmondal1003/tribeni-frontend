import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HelpService {

  constructor(private http: HttpClient) { }  

  getHelp(): Observable<any>{
    return this.http.get('assets/json/help.json')
  } 

}
