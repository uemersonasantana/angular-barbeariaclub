import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public agendamentos: Agendamento[] = [];
  public res:any;

  constructor(
    private _http: HttpClient
    ) {
      this._http.post(API_URL + '/agendamentos/find/', null).subscribe(
        (agendamentos: any[]) => {
          for(let p of agendamentos) {
            this.agendamentos.push(p);
          }
        }
      );
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

    

  getAgendamentos(params?:any): Observable<Agendamento[]> {
    return this._http.post(API_URL + '/agendamentos/find/', params)
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
    let tipoForm:string;

    if ( agendamento.id == '' ) {
      tipoForm = 'new'
    } else { 
      tipoForm = 'edit'
    }
    
    return this._http.post(API_URL + '/agendamento/'+tipoForm, agendamento)
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
  
  apagar(id: number) {
    this._http.delete(API_URL + '/agendamento/' + id).subscribe(
      (event) => {
        console.log(this.agendamentos)
        let i = this.agendamentos.findIndex((p) => p.id == id);
        if (i>=0)
          this.agendamentos.splice(i,1);
      });
  }
}
