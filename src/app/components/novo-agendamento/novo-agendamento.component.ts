import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Barbeiro,BarbeiroService} from '../../services/barbeiro.service';
import {Agendamento,AgendamentoService} from '../../services/agendamento.service';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

const API_URL: string = 'http://localhost:8000/api';

@Component({
  selector: 'app-novo-agendamento',
  templateUrl: './novo-agendamento.component.html',
  styleUrls: ['./novo-agendamento.component.css']
})
export class NovoAgendamentoComponent implements OnInit {

  barbeiros: Barbeiro[];
  agendamento: Agendamento = {
    id: 0,
    descricao: '',
    dataagendamento: null,
    cliente_id: 0,
    barbeiro_id: 0
  };

  searchClientsCtrl = new FormControl();
  filteredClients: any;
  isLoading = false;
  errorMsg: string;
  isOpen = false;

  htmlOfErrors:any;

  constructor(
    private AgendamentoService: AgendamentoService,
    private BarbeiroService: BarbeiroService,
    private http: HttpClient,
    //public dialogref: MatDialogRef<NovoAgendamentoComponent>
  ) {}

  ngOnInit(): void {
    this.barbeiros = this.BarbeiroService.barbeiros;
  
    this.searchClientsCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredClients = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(API_URL+"/clientes/"+value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.filteredClients = data;
        /*if (data['Search'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredClients = [];
        } else {
          this.errorMsg = "";
          this.filteredClients = data['Search'];
        }*/
      });
  }

  public onSetDate(newDate: Date) {
    this.isOpen = false;
    this.agendamento.dataagendamento = newDate;
  }

  
  salvar() {
    this.agendamento.empresa_id = 1;
    this.agendamento.user_id = 1
  
    this.AgendamentoService
        .addAgendamentos(this.agendamento)
        .subscribe(
            agendamentos => {
              //this.dialogref.close();
            },
            error => {
              this.htmlOfErrors = '<ul>';
              
              for(let e of Object.keys(error.error.errors) ) {
                this.htmlOfErrors += "<li>"+error.error.errors[e][0]+"</li>";
              }

              this.htmlOfErrors += '</ul>';
              //<any>error
            }
        );
  }
  cancelar() {
    //this.dialogref.close(null);
  }

  selecionarCliente(id) {
    if ( this.searchClientsCtrl.value != '' ) {
      this.agendamento.cliente_id = id;
    }
  }

  limparIdCliente() {
    this.agendamento.cliente_id = 0;
  }
}
