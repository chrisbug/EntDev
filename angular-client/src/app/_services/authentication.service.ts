import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;
  public url = 'https://34.244.22.138:443/api/';

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    console.log(currentUser);
  }

  getUrl() {
    return this.url;
  }

  login(email: string, password: string) {
    console.log(email + ' ' + password + '  ' + this.url + 'user/authenticate');
    return this.http.post(this.url + 'user/authenticate', {email: email, password: password});
  }

  signup(email: string, password: string) {
    return this.http.post(this.url + 'user/signup', {email: email, password: password});
  }

  isAuthenticated() {
    if (this.token != null) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // clear all user info from sesion
    this.token = null;
    localStorage.clear();
  }

  setToken(token: any) {
    this.token = token;
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return this.token;
  }

}
