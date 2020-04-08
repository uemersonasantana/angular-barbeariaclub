import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Agendamento, AgendamentoService } from '../../../services/agendamento.service';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { Barbeiro, BarbeiroService } from '../../../services/barbeiro.service';
import { TokenService } from 'src/app/services/token.service';
import {NgbDateStruct,NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const API_URL: string = 'http://localhost:8000/api';

@Component({
  selector: 'app-ce-agendamento',
  templateUrl: './ce-agendamento.component.html',
  styleUrls: ['./ce-agendamento.component.css']
})
export class CeAgendamentoComponent implements OnInit {

  error:any;
  data:Date;
  time:NgbTimeStruct;
  keyword = 'nome';
  duedates:boolean = false;
  
  tempClienteNome:string;

  agendamento: Agendamento[]  = [
    {
      id:null,
      descricao:'',
      cliente_id:null,
      barbeiro_id:null,
      dataagendamento:null
    }
];
  clientes: Cliente[];
  barbeiros: Barbeiro[];

  title:any;

  config = {
    format: "DD/MM/YYYY HH:mm"
  };
  servicos: any[] = [
    { nome: 'BARBA' },
    { nome: 'CABELO' },
    { nome: 'BARBA+CABELO' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CeAgendamentoComponent>,
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private Token: TokenService,
    private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/agendamentos/find/', formID).subscribe(
          (agendamento: any[]) => {
            this.agendamento = [];
            for(let p of agendamento) {
              let c = p.cliente;
              
              this.tempClienteNome = c.nome
              this.agendamento.push(p);
            }
          }
        )

      }
    }

  

  ngOnInit(): void {
    //this.tempClienteNome = this.agendamento[0]['cliente'].nome;

    this.getClientes();
    this.getBarbeiros();
  }

  getAgendamento(value?:any) {
    this.AgendamentoService
        .getAgendamentos(value)
        .subscribe(
            agendamento => this.agendamento = agendamento,
            error => this.handleError(error)
        );
  }

  postAgendamento(value?:any) {
    this.AgendamentoService
        .postAgendamento(value)
        .subscribe(
            agendamento => {
              this.dialogRef.close(agendamento);
            },
            error => {
              this.handleError(error)
            }
        );
  }

  getClientes() {
    this.ClienteService
        .getClientes()
        .subscribe(
            clientes => this.clientes = clientes,
            error => this.error = <any>error
        );
  }

  getBarbeiros() {
    this.BarbeiroService
        .getBarbeiros()
        .subscribe(
            barbeiros => this.barbeiros = barbeiros,
            error => this.error = <any>error
        );
  }

  pad(num:number, size:number): string {
      let s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  }
  
  onSubmit() {
    let tempData:any;

    for(let d of Object.keys(this.data) ) {
      if ( d === "year" ) {
        tempData = this.data[d]
      }
      if ( d === "month" ) {
        tempData += '-'+this.data[d]
      }
      if ( d === "day" ) {
        tempData += '-'+this.data[d]
      }
    }

    if ( this.data && this.time ) {
      this.agendamento[0].dataagendamento = new Date(tempData + ' ' + this.pad(this.time.hour,2) + ':' + this.pad(this.time.minute,2));
    } else {
      this.agendamento[0].dataagendamento = null
    }
    this.error = null;
    this.postAgendamento(this.agendamento);
    this.dialogRef.close(this.agendamento);
  }
  
  cancelar() {
    this.dialogRef.close(null);
  }

  handleError(error) {
    this.error = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.error += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
    }
    this.error += '<table>';
    //<any>error
  }

  selectEvent(item:any) {
    let id_cliente = item.id
    this.agendamento[0].cliente_id = id_cliente
    // do something with selected item
  }
 
  clearedSearch(val: string) {
    this.agendamento[0].cliente_id = 0;
    console.log('Limpou')
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
}
