import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private http: HttpClient) { }

  testUrl: string = ''

  getAPI(url: string, Params: string | null | void): Observable<any> {
    return this.http.get(url)
  }

}
