import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {GlobalConstants} from '../global-constants';

const API_URL:string = GlobalConstants.API_URL;

export interface Uf {
  id: number,
  nome: string,
}

@Injectable({
  providedIn: 'root'
})
export class UfService {

  public ufs: Uf[] = [];

  constructor(
    private _http: HttpClient
  ) { 
    this._http.post(API_URL + '/ufs', null).subscribe(
      (data: any[]) => {
        for(let d of data) {
          this.ufs.push(d);
        }
      }
    )
  }
}
