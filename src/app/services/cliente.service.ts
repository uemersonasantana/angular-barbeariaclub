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
    
  }
  /*this.http.get(API_URL+"/clientes/"+val)
  .subscribe((data: any[]) => {
    this.clientes = [];
    for(let c of data) {
      this.clientes.push(c)
      console.log(c);
    }
  });*/

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
