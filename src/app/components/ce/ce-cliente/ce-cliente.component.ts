import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cliente,Endereco,ClienteService} from 'src/app/services/cliente.service';
import {Uf, UfService} from '../../../services/uf.service';
import {Municipio, MunicipioService} from '../../../services/municipio.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GlobalConstants} from '../../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

@Component({
  selector: 'app-ce-cliente',
  templateUrl: './ce-cliente.component.html',
  styleUrls: ['./ce-cliente.component.css']
})
export class CeClienteComponent implements OnInit {

  cliente: Cliente[]  = [
    {
      id:null,
      nome:null,
      sobrenome:null,
      apelido:null,
      cpf:null,
      fone1:null,
      fone2:null,
      email:null
    }
  ];

  endereco: Endereco[]  = [
    {
      id:null,
      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      municipio_id: null,
      cep: null
    }
  ];
  
  ufs: Uf[];
  municipios: Municipio[];

  uf:number;
  municipio:number;

  error:any;
  panelOpenState = false;

  constructor(
    public dialogRef: MatDialogRef<CeClienteComponent>,
    private ClienteService: ClienteService
    ,private UfService: UfService
    ,private MunicipiosService: MunicipioService
    ,private _http: HttpClient
    ,@Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/cliente/edit/', formID).subscribe(
          (cliente: Cliente[]) => {
            this.cliente  = cliente
            if ( cliente[0]['endereco_id']) {
              this.endereco = [
                {
                  id:cliente[0]['endereco_id'],
                  logradouro: cliente[0]['logradouro'],
                  numero: cliente[0]['numero'],
                  complemento: cliente[0]['complemento'],
                  bairro: cliente[0]['bairro'],
                  municipio_id: cliente[0]['municipio_id'],
                  cep: cliente[0]['cep']
                }
              ]
              this.uf = cliente[0]['uf_id'];
              this.municipio = cliente[0]['municipio_id'];
              if ( this.uf ) {
                this.selectMunicipio(this.uf)
              }
            }
          }
        )

      }
    }

  ngOnInit(): void {
    this.ufs        = this.UfService.ufs;
    
  }

  selectMunicipio(uf_id:number) {
    if ( uf_id ) { 
      this.municipios = [
        {
          id:0
          ,nome:'Carregando...'
        }
      ];

      this.MunicipiosService
        .getMunicipios(uf_id)
        .subscribe(
            municipios => this.municipios = municipios,
            error => this.handleError(error)
        );
    } else {
      this.municipios = null;
    }
  }


  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.error = null;

    this.cliente[0]['logradouro'] = this.endereco[0]['logradouro']
    this.cliente[0]['numero'] = this.endereco[0]['numero']
    this.cliente[0]['complemento'] = this.endereco[0]['complemento']
    this.cliente[0]['bairro'] = this.endereco[0]['bairro']
    this.cliente[0]['municipio_id'] = this.municipio
    this.cliente[0]['cep'] = this.endereco[0]['cep']
    this.cliente[0]['uf_id'] = this.uf
    
    this.post(this.cliente[0]);
  }
  
  post(value?:any) {
    this.ClienteService
        .post(value)
        .subscribe(
            data => {
              this.dialogRef.close(data);
            },
            error => {
              this.handleError(error)
            }
        );
   }

  handleError(error:any) {
    this.error = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.error += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
    }
    this.error += '<table>';
  }

}
