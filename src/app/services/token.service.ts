import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseUrl:string = GlobalConstants.API_URL;

  private iss = {
    login: this.baseUrl+'/login',
    signup: this.baseUrl+'/signup'
  };

  constructor(private _http: HttpClient ) { }
  
  
  refreshToken() {
    return this._http.post(`${this.baseUrl}/ufs`, null);
  }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}