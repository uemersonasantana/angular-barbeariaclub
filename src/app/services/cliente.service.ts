import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Cliente {
  id: number,
  nome: string,
  sobrenome: string,
  apelido: string,
}

const API_URL: string = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  public clientes: Cliente[] = [];
  public res:any;

  constructor(
    private http: HttpClient
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
        headers: headers
    }
    
    return this.http.get(API_URL + '/clientes', options)
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
