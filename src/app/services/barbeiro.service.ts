import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

export interface Barbeiro {
  id: string,
  nome: string,
  fone: string,
  email: string,
  
  empresa_id?: number,
  user_id?: number
}

const API_URL:string = GlobalConstants.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  public barbeiros: Barbeiro[] = [];

  constructor(private _http: HttpClient) { 
    this._http.post(API_URL + '/barbeiros', null).subscribe(
      (barbeiros: any[]) => {
        for(let b of barbeiros) {
          this.barbeiros.push(b);
        }
      }
    )
  }

  getBarbeiros(): Observable<Barbeiro[]> {
    return this._http.post(API_URL + '/barbeiros',null)
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
