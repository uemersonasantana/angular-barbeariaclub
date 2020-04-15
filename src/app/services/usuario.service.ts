import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GlobalConstants} from '../global-constants';

export interface Usuario {
  id: string,
  name: string,
  email: string,
  password: string
}

const API_URL:string = GlobalConstants.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarios: Usuario[] = [];
  public userLogged: Usuario[] = [];

  constructor(private _http: HttpClient) {}
  
  me(): void { 
    this.userLogged = []
    this._http.get(API_URL + '/me').subscribe(
      (data: any[]) => {
        this.userLogged.push(data['user'])
      })
  }

  getUsuarios(): Observable<Usuario[]> {
    return this._http.post(API_URL + '/usuarios',null)
    .pipe(
      map((response: any) => {
        return response; 
      }),
      catchError(error => {
        return throwError(error);
      })
      
      );
  }

  post(usuario: Usuario): Observable<Usuario[]> {
    let tipoForm:string;

    if ( usuario.id == null ) {
      tipoForm = 'store'
    } else { 
      tipoForm = 'update'
    }
    
    return this._http.post(API_URL + '/usuario/'+tipoForm, usuario)
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
    this._http.delete(API_URL + '/usuario/' + id).subscribe();
  }
}
