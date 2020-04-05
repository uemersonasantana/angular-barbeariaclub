import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Agendamento, AgendamentoService } from '../../../services/agendamento.service';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { Barbeiro, BarbeiroService } from '../../../services/barbeiro.service';
import { TokenService } from 'src/app/services/token.service';

const API_URL: string = 'http://localhost:8000/api';

@Component({
  selector: 'app-ce-agendamento',
  templateUrl: './ce-agendamento.component.html',
  styleUrls: ['./ce-agendamento.component.css']
})
export class CeAgendamentoComponent implements OnInit {

  agendamento: Agendamento[];
  clientes: Cliente[];
  barbeiros: Barbeiro[];

  isLoading: boolean = true;
  config = {
    format: "DD/MM/YYYY HH:mm",
    /*
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: "YYYY-MM-DD HH:mm",
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: 'zh-cn',*/
    // min:'2017-08-29 15:50',
    // minTime:'2017-08-29 15:50'
  };
  servicos: any[] = [
    { nome: 'BARBA' },
    { nome: 'CABELO' },
    { nome: 'BARBA+CABELO' }
  ];
  
  error:any;
  keyword = 'nome';
  duedates:boolean = false;

  public form = {
    id:'',
    descricao:'',
    cliente_id:'',
    barbeiro_id:'',
    dataagendamento:'',
    empresa_id:1,
    user_id:1
  };


  constructor(
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private Token: TokenService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAgendamento();
    this.getClientes();
    this.getBarbeiros();
  }

  getAgendamento(value?:any) {
    this.AgendamentoService
        .getAgendamentos(value)
        .subscribe(
            agendamentos => this.agendamento = agendamentos,
            error => this.handleError(error)
        );
  }

  postAgendamento(value?:any) {
    this.AgendamentoService
        .postAgendamento(value)
        .subscribe(
            agendamentos => this.agendamento = agendamentos,
            error => this.handleError(error)
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

  onSubmit() {
    // Ao invés de enviar o objeto, enviamos apenas o id do cliente.
    let c;
    c = this.form.cliente_id;
    
    if ( c['id'] > 0 ) 
      this.form.cliente_id = c['id']

    this.error = null;
    this.postAgendamento(this.form);

    this.form.cliente_id = c['nome']
  }

  handleError(error) {
    this.error = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.error += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
    }
    this.error += '<table>';
    //<any>error
  }


  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }
}
