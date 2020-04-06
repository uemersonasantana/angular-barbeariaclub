import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export interface Agendamento {
  id: number,
  descricao: string,
  dataagendamento: Date,
  cliente_id: number,
  barbeiro_id: number,
  empresa_id?: number,
  user_id?: number
}

const API_URL: string = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  public res:any;

  constructor(
    private http: HttpClient
    ) {
  }

/*
     * explanation of observable response object
     * 
     * resData = {
     *      data: <object>,
     *      statusCode: <number>,
     *      response: <jwres>,
     *      error: <undefined>
     * }
     * 
     * error = {
     *      data: null,
     *      statusCode: <number>,
     *      response: <jwres>,
     *      error: <jwres.error>
     * }
     */


  getAgendamentos(value?:any): Observable<Agendamento[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
        headers: headers,
        params: value
    }

    return this.http.get(API_URL + '/agendamentos/', options)
    .pipe(
      map((response: any) => {
        return response; 
      }),
      catchError(error => {
        return throwError(error);
      })
      
      );
  }

  postAgendamento(agendamento): Observable<Agendamento[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
        headers: headers
    }

    let tipoForm:string;

    if ( agendamento.id == '' ) {
      tipoForm = 'novo'
    } else { 
      tipoForm = 'editar'
    }
    
    return this.http.post(API_URL + '/agendamento/'+tipoForm, agendamento, options)
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
}
