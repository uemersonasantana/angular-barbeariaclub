import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

const API_URL:string = GlobalConstants.API_URL;

export interface Municipio {
  id: number,
  nome: string,
}

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  public municipios: Municipio[] = [];

  constructor(private _http: HttpClient) {}

  getMunicipios(uf_id:any): Observable<Municipio[]> {
    return this._http.get(API_URL + '/municipios/'+uf_id)
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
