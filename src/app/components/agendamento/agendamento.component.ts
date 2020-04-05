import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Agendamento, AgendamentoService } from '../../services/agendamento.service';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { Barbeiro, BarbeiroService } from '../../services/barbeiro.service';
import 'rxjs/Rx';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const API_URL: string = 'http://localhost:8000/api';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent  {
  
  agendamentos: Agendamento[];
  clientes: Cliente[];
  barbeiros: Barbeiro[];


  errorMessage: string;
  isLoading: boolean = true;
  config = {
    format: "DD/MM/YYYY",
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
  tempo: any[] = [
    { id: 0, nome: 'Todos' },
    { id: 1, nome: 'Hoje' },
    { id: 2, nome: 'Esta semana' },
    { id: 3, nome: 'Este mês' },
    { id: 4, nome: 'Últimos 30 dias' },
    { id: 5, nome: 'Escolha o período' }
  ];

  errorMsg: string;
  keyword = 'nome';
  duedates:boolean = false;
  

  public form = {
    cliente_id:'',
    barbeiro_id:'',
    tempo:'',
    dataInicial:'',
    dataFinal:''
  };

  constructor(
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAgendamentos();
    this.getClientes();
    this.getBarbeiros();
  }

  getAgendamentos(value?:any) {
    this.AgendamentoService
        .getAgendamentos(value)
        .subscribe(
            agendamentos => this.agendamentos = agendamentos,
            error => this.handleError(error)
        );
  }

  getClientes() {
    this.ClienteService
        .getClientes()
        .subscribe(
            clientes => this.clientes = clientes,
            error => this.errorMessage = <any>error
        );
  }

  getBarbeiros() {
    this.BarbeiroService
        .getBarbeiros()
        .subscribe(
            barbeiros => this.barbeiros = barbeiros,
            error => this.errorMessage = <any>error
        );
  }

  onSubmit() {
    // Ao invés de enviar o objeto, enviamos apenas o id do cliente.
    let c;
    c = this.form.cliente_id;
    
    if ( c['id'] > 0 ) 
      this.form.cliente_id = c['id']

    this.errorMessage = null;
    this.getAgendamentos(this.form);

    this.form.cliente_id = c['nome']
  }

  handleError(error) {
    this.errorMessage = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.errorMessage += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
    }
    this.errorMessage += '<table>';
    //<any>error
  }

  onBoxDueDates(value) {
    if (value==5) {
      this.duedates = true
    } else {
      this.form.dataInicial = null
      this.form.dataFinal = null
      this.duedates = false
    }
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
