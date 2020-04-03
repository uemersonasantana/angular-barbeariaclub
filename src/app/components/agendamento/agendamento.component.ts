import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovoAgendamentoComponent } from '../novo-agendamento/novo-agendamento.component';
import { Agendamento, AgendamentoService } from '../../services/agendamento.service';
import 'rxjs/Rx';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent  {
  
  agendamentos: Agendamento[];
  errorMessage: string;
  isLoading: boolean = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private AgendamentoService: AgendamentoService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAgendamentos();
  }

  getAgendamentos() {
    this.AgendamentoService
        .getAgendamentos()
        .subscribe(
            agendamentos => this.agendamentos = agendamentos,
            error => this.errorMessage = <any>error
        );
  }
  NovoAgendamento() {
    const dialogRef = this.dialog.open(NovoAgendamentoComponent, 
    {
      width: '600px'
    });
  }
}
