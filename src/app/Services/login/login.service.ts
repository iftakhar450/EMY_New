import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  // url: any = '/login';
  login(data) {
   const url: any = environment.baseUrl + environment.loginApi;
    return this.http.post(url, data);
  }
}
