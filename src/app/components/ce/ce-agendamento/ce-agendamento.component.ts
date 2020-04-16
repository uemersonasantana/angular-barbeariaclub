import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Agendamento, AgendamentoService } from '../../../services/agendamento.service';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { Barbeiro, BarbeiroService } from '../../../services/barbeiro.service';
import {NgbDateStruct,NgbTimeStruct,NgbDate,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {GlobalConstants} from '../../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';
  readonly DELIMITER_SHOW = '/';
  readonly DELIMITER_TIME = ':';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
     };
   }
    return null;
 }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER_SHOW + date.month + this.DELIMITER_SHOW + date.year : '';
 }
}

@Component({
  selector: 'app-ce-agendamento',
  templateUrl: './ce-agendamento.component.html',
  styleUrls: ['./ce-agendamento.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CeAgendamentoComponent implements OnInit {

  error:any;
  fromDate:any;
  fromTime:any;
  tempClienteNome:string;

  keyword = 'nome';
  duedates:boolean = false;
  
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

  config = {
    format: "DD/MM/YYYY HH:mm"
  };

  servicos: any[] = [
    { nome: 'BARBA' },
    { nome: 'CABELO' },
    { nome: 'BARBA+CABELO' }
  ]

  modo:any;
  isLoadingResult:boolean;

  constructor(
    public dialogRef: MatDialogRef<CeAgendamentoComponent>,
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private _http: HttpClient,
    public formatter: NgbDateParserFormatter,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        this.modo = 'Editar'

        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/agendamentos/find/', formID).subscribe(
          (agendamento: any[]) => {
            this.agendamento = [];
            for(let p of agendamento) {
              let c = p.cliente;
              this.tempClienteNome = c.nome
              this.fromDate = NgbDate.from(this.formatter.parse(p.dataagendamento))
              this.fromTime = this.parseTime(p.dataagendamento.substr(11,5))

              this.agendamento.push(p);
            }
          }
        )
      } else {
        this.modo = 'Novo'
      }
    }

  ngOnInit(): void {
    this.getClientes();
    this.getBarbeiros();
  }

  parseTime(value: string): NgbTimeStruct | null {
      if (value) {
        let time = value.split(':');
        return {
          hour : parseInt(time[0], 10)
          ,minute : parseInt(time[1], 10)
          ,second : 0
      };
    }
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

    for(let d of Object.keys(this.fromDate) ) {
      if ( d === "year" ) {
        tempData = this.fromDate[d]
      }
      if ( d === "month" ) {
        tempData += '-'+this.fromDate[d]
      }
      if ( d === "day" ) {
        tempData += '-'+this.fromDate[d]
      }
    }

    if ( this.fromDate && this.fromTime ) {
      this.agendamento[0].dataagendamento = new Date(tempData + ' ' + this.pad(this.fromTime.hour,2) + ':' + this.pad(this.fromTime.minute,2))
    } else {
      this.agendamento[0].dataagendamento = null
    }
    this.error = null;
    this.postAgendamento(this.agendamento[0]);
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
  }

  getServerResponseClientes(event) {
    this.isLoadingResult = true;
    this.ClienteService.getBuscaClientes(event).subscribe(
      data => { 
        if (data[0]['nome'] == undefined) {
          this.clientes = []
        } else {
          this.clientes = data
        }
        this.isLoadingResult = false;
      })
  }

  searchClearedClientes() {
    this.agendamento[0].cliente_id = 0;
    this.clientes = [];
  }

  selectEvent(item) {
    if (item) {
      let id_cliente = item.id
      this.agendamento[0].cliente_id = id_cliente
    }
  }
}
