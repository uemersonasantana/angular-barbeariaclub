import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private _http: HttpClient  
  ) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }
  
  logout(data) {
    return this.http.post(`${this.baseUrl}/logout`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

}