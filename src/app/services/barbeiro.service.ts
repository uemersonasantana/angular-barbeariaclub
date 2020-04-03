import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Barbeiro } from '../modal/barbeiro';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  public barbeiros: Barbeiro[] = [];

  constructor(private http: HttpClient) { 
    this.http.get("/api/barbeiros").subscribe(
      (barbeiros: any[]) => {
        for(let a of barbeiros) {
          this.barbeiros.push(
            new Barbeiro(a.id
              ,a.nome
              ,a.fone
              ,a.email
              ,a.empresa_id
              ,a.user_id
              )
          );
        }
      }
    )
  }
}
