import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

const API_URL:string = GlobalConstants.API_URL;

export interface Cliente {
  id: number,
  nome: string,
  sobrenome: string,
  apelido: string,
  cpf: string,
  fone1: string,
  fone2: string,
  email: string,
}

export interface Endereco {
  id: number,
  logradouro: string,
  numero: number,
  complemento: string,
  bairro: string,
  municipio_id: number,
  cep: string
}

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  public clientes: Cliente[] = [];
  public res:any;

  constructor(private _http: HttpClient) {}

  getBuscaClientes(q): Observable<Cliente[]> {
    return this._http.get(API_URL + '/clientes/buscar/'+q)
    .pipe(
        map((response: any) => {
          return response; 
        }),
        catchError(error => {
          return throwError(error);
        })
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

  post(barbeiro: Cliente): Observable<Cliente[]> {
    let tipoForm:string;

    if ( barbeiro.id == null ) {
      tipoForm = 'store'
    } else { 
      tipoForm = 'update'
    }
    
    return this._http.post(API_URL + '/cliente/'+tipoForm, barbeiro)
    .pipe(
      map((response: any) => {
        return response; 
      }),
      catchError(error => {
        console.log(error)
        return throwError(error);
      })
      
      );
  }

  apagar(id:any) {
    this._http.delete(API_URL + '/cliente/' + id).subscribe()
  }
}
