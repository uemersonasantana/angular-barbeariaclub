import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { SnotifyService } from 'ng-snotify';
import {GlobalConstants} from '../global-constants';

export interface Agendamento {
  id: number,
  descricao: string,
  dataagendamento: Date,
  cliente_id: number,
  barbeiro_id: number,
  empresa_id?: number,
  user_id?: number
}

const API_URL:string = GlobalConstants.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  public agendamentos: Agendamento[] = [];
  public NotifyAgendamentos: Agendamento[] = [];
  public res:any;

  constructor(
    private _http: HttpClient,
    private Notfiy:SnotifyService
    ) {
      this._http.post(API_URL + '/agendamentos/find/', null).subscribe(
        (agendamentos: any[]) => {
          for(let p of agendamentos) {
            this.agendamentos.push(p);
          }
        }
      )
      this.getNotifyAgendamentos()
  }

  getNotifyAgendamentos(): void {
    let tempForm = {
      tempo:6
    }

    this._http.post(API_URL + '/agendamentos/find/', tempForm).subscribe(
      (data: any[]) => {
        for(let d of data) {
          //console.log(d.cliente.sobrenome.length)
          let tresPontos:string = ''
          let Fone2:string = ''

          if ( d.cliente.sobrenome.length > 6 ) {
            tresPontos = '...'
          }
          if (Fone2) {
            Fone2 = ' | '+'Fone 2: '+d.cliente.fone2
          }
          
          this.Notfiy.confirm('Fone 1: '+d.cliente.fone1 + Fone2, d.cliente.nome + ' ' + d.cliente.sobrenome.substr(0,6) + tresPontos, {
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            buttons: [
              {text: 'Fechar', action: (toast) => {this.Notfiy.remove(toast.id); }, bold: false},
            ]
          });
        }
      }
    )
  }

  addLinha(agendamento:any) {
    this.agendamentos.push(agendamento[0])
  }

  delLinha(agendamento:any) {
    let i = this.agendamentos.findIndex((p) => p.id == agendamento);
    if (i>=0)
      this.agendamentos.splice(i,1);
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

    if ( agendamento.id == null ) {
      tipoForm = 'new'
    } else { 
      tipoForm = 'edit'
      //delete agendamento['cliente'];
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
        let i = this.agendamentos.findIndex((p) => p.id == id);
        if (i>=0)
          this.agendamentos.splice(i,1);
      });
  }
}
