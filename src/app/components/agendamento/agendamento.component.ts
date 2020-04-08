import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agendamento, AgendamentoService} from '../../services/agendamento.service';
import {Cliente, ClienteService} from '../../services/cliente.service';
import {Barbeiro, BarbeiroService} from '../../services/barbeiro.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter,NgbDatepickerI18n, NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConstants} from '../../global-constants';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeAgendamentoComponent} from '../../components/ce/agendamento/ce-agendamento.component'
import 'rxjs/Rx';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const API_URL:string = GlobalConstants.API_URL;

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
  clientes: Cliente[];
  barbeiros: Barbeiro[];
  
  errorMessage: string;
  isLoading: boolean = true;
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

  errorMsg: string;
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

  constructor(
    private AgendamentoService: AgendamentoService,
    private ClienteService: ClienteService,
    private BarbeiroService: BarbeiroService,
    private http: HttpClient,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public dialog: MatDialog,
    private _i18n: I18n
  ) {
    //this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    
 }

  //@ViewChild('teste') contentElement: ElementRef;
  

  ngOnInit() {
    this.agendamentos = this.AgendamentoService.agendamentos;
    
    //this.getAgendamentos();
    this.getClientes();
    this.getBarbeiros();
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
            },
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

  openDialog(id?:number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
        id: id
    };

    const dialogRef = this.dialog.open(CeAgendamentoComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.AgendamentoService.delLinha(result[0].id);
          this.AgendamentoService.addLinha(result);
       }
     }
    );
 }

 apagarAgendamento(id:number) {
    this.AgendamentoService.apagar(id);
  }

}
