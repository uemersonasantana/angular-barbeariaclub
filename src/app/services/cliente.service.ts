import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

export interface Cliente {
  id: number,
  nome: string,
  sobrenome: string,
  apelido: string,
}

const API_URL:string = GlobalConstants.API_URL;

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  public clientes: Cliente[] = [];
  public res:any;

  constructor(
    private _http: HttpClient
  ) { 
    this._http.post(API_URL + '/clientes', null).subscribe(
      (clientes: any[]) => {
        for(let c of clientes) {
          this.clientes.push(c);
        }
      }
    )
  }

  getClientes(): Observable<Cliente[]> {
    return this._http.post(API_URL + '/clientes',null)
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
