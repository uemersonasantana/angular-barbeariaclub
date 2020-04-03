import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Cliente } from '../modal/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public clientes: Cliente[] = [];

  constructor(
  ) { 
    
  }

  

}
