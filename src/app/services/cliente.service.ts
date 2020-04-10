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

  addLinha(cliente:any) {
    this.clientes.push(cliente)
  }

  delLinha(cliente:any) {
    let i = this.clientes.findIndex((p) => p.id == cliente);
    if (i>=0)
      this.clientes.splice(i,1);
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
    this._http.delete(API_URL + '/cliente/' + id).subscribe(
      (event) => {
        let i = this.clientes.findIndex((b) => b.id == id);
        if (i>=0)
          this.clientes.splice(i,1);
      });
  }
}
