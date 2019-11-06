import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: any = false;
  constructor() { }
  getLoginStatus() {
    return this.isLogin;
  }
  setLoginStatus(val) {
    this.isLogin = val;
  }
}
