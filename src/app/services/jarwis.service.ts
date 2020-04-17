import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl:string = GlobalConstants.API_URL;

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
  
  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, null).subscribe()
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
}