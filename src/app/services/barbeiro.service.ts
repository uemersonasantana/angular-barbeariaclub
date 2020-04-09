import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

export interface Barbeiro {
  id: string,
  nome: string,
  fone: string,
  email: string
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

  addLinha(barbeiro:any) {
    this.barbeiros.push(barbeiro)
  }

  delLinha(barbeiro:any) {
    let i = this.barbeiros.findIndex((p) => p.id == barbeiro);
    if (i>=0)
      this.barbeiros.splice(i,1);
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

  post(barbeiro: Barbeiro): Observable<Barbeiro[]> {
    let tipoForm:string;

    if ( barbeiro.id == null ) {
      tipoForm = 'store'
    } else { 
      tipoForm = 'update'
    }
    
    return this._http.post(API_URL + '/barbeiro/'+tipoForm, barbeiro)
    .pipe(
      map((response: any) => {
        return response; 
      }),
      catchError(error => {
        return throwError(error);
      })
      
      );
  }

  apagar(id:any) {
    this._http.delete(API_URL + '/barbeiro/' + id).subscribe(
      (event) => {
        let i = this.barbeiros.findIndex((b) => b.id == id);
        if (i>=0)
          this.barbeiros.splice(i,1);
      });
  }
}
