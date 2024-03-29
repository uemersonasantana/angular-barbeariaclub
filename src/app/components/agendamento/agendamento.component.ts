import {Component, Injectable, ViewChild} from '@angular/core';
import {Agendamento, AgendamentoService} from '../../services/agendamento.service';
import {Cliente, ClienteService} from '../../services/cliente.service';
import {Barbeiro, BarbeiroService} from '../../services/barbeiro.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter,NgbDatepickerI18n, NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeAgendamentoComponent} from '../ce/ce-agendamento/ce-agendamento.component'
import 'rxjs/Rx';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const I18N_VALUES = {
  'pt': {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
 }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'pt';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
 }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
 }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
 }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
 }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
 }
}

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
     };
   }
    return null;
 }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
 }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
     };
   }
    return null;
 }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
 }
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
  providers: [
    I18n
    ,{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}
    ,{provide: NgbDateAdapter, useClass: CustomAdapter}
    ,{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ] // define custom NgbDatepickerI18n provider
})
export class AgendamentoComponent {
  
  agendamentos: Agendamento[];
  NotifyAgendamentos: Agendamento[];
  clientes: Cliente[];
  barbeiros: Barbeiro[];
  
  errorMessage: string;
  config = {
    format: "DD/MM/YYYY"
  };

  tempo: any[] = [
    {id: 0, nome: 'Todos'},
    {id: 1, nome: 'Hoje'},
    {id: 2, nome: 'Esta semana'},
    {id: 3, nome: 'Este mês'},
    {id: 4, nome: 'Últimos 30 dias'},
    {id: 5, nome: 'Escolha o período'}
  ];

  keyword = 'nome';
  duedates:boolean = false;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  public form = {
      cliente_id:'',
      barbeiro_id:0,
      tempo:0,
      dataInicial: null,
      dataFinal: null
  };

  CurrentDate = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
  
  displayedColumns: string[] = ['id', 'data', 'hora', 'servico', 'cliente', 'barbearia', 'actions'];
  dataSource: MatTableDataSource<Agendamento>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //@Input() sorting: MatSortable;
  isLoading = true;

  isLoadingResult: boolean;

  constructor(
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public dialog: MatDialog
    //,private _i18n: I18n
  ) {}
  
  ngOnInit() {
    this.BarbeiroService.getBarbeiros().subscribe( data => { this.barbeiros = data })
    
    this.AgendamentoService.getAgendamentos()
       .subscribe(
        data => {
          this.isLoading = false;
          this.agendamentos = data;
          // Assign the data to the data source for the table to render
          this.dataSource =  new MatTableDataSource(this.agendamentos)
          this.dataSource.paginator = this.paginator;
          this.sort.sort(({ id: 'dataagendamento', start: 'desc'}) as MatSortable)
          this.dataSource.sort = this.sort;
        }, 
        error => this.isLoading = false
    )
  }

  ngOnDestroy() {
    this.agendamentos = null;
    this.barbeiros    = null;
    this.clientes     = null;
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
    this.clientes = [];
  }

  addRowInTable(data){
    this.agendamentos.push(data[0]);
    this.dataSource._updateChangeSubscription()
  }
  updateRowInTable(data) {
    let i = this.agendamentos.findIndex((d) => d.id == data[0].id);
    if (i>=0) {
      this.agendamentos[i] = data[0] 
    }
    this.dataSource._updateChangeSubscription()
  }
  delRowInTable(id) {
    let i = this.agendamentos.findIndex((d) => d.id == id);
    if (i>=0) {
      this.agendamentos.splice(i,1)
    }
    this.dataSource._updateChangeSubscription()
    this.AgendamentoService.apagar(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAgendamentos(value?:any) {
    this.AgendamentoService
        .getAgendamentos(value)
        .subscribe(
            agendamentos => {
              this.agendamentos = []
              for(let t of agendamentos) { 
                this.agendamentos.push(t);
              }
              // Assign the data to the data source for the table to render
              this.dataSource =  new MatTableDataSource(this.agendamentos)
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => this.handleError(error)
        )
 }

  onSubmit() {
    if (this.fromDate) {
      this.form.dataInicial = this.fromDate.day+'/'+this.fromDate.month+'/'+this.fromDate.year;
   } else {
      this.form.dataInicial = ''
   }
    if (this.toDate) {
      this.form.dataFinal = this.toDate.day+'/'+this.toDate.month+'/'+this.toDate.year;
   } else {
      this.form.dataFinal = ''
   }
    
    // Ao invés de enviar o objeto, enviamos apenas o id do cliente.
    let c:any;
    if (this.form.cliente_id) {
      c = this.form.cliente_id;
      
      if ( c['id'] > 0 ) {
        this.form.cliente_id = c['id']
     }
   }

    this.errorMessage = null;
    this.getAgendamentos(this.form);
    
    if (this.form.cliente_id) {
      this.form.cliente_id = c['nome']
   }
 }

  handleError(error) {
    this.errorMessage = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.errorMessage += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
   }
    this.errorMessage += '<table>';
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
   } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
   } else {
      this.toDate = null;
      this.fromDate = date;
   }
 }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
 }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
 }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
 }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
 }

  openModal(id?:number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
        id: id
    };

    const dialogRef = this.dialog.open(CeAgendamentoComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          if ( result[0].modo == 'editar' ) {
            this.updateRowInTable(result);
          } else {
            this.addRowInTable(result);
          }
       }
     }
    );
 }

 apagarAgendamento(id:number) {
    this.AgendamentoService.apagar(id);
  }
}
