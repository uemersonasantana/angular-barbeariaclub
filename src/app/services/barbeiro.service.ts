import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Barbeiro {
  id: string,
  nome: string,
  fone: string,
  email: string,
  
  empresa_id?: number,
  user_id?: number
}

const API_URL: string = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  public barbeiros: Barbeiro[] = [];

  constructor(private _http: HttpClient) { 
  }

  getBarbeiros(): Observable<Barbeiro[]> {
    let options = {}

    return this._http.post(API_URL + '/barbeiros',options)
    .pipe(
      map((response: any) => {
        return response; 
      }),
      catchError(error => {
        return throwError(error);
      })
      
      );
  }
}
