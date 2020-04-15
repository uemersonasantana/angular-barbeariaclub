import { Component, OnInit, ViewChild } from '@angular/core';
import {Cliente, ClienteService} from '../../services/cliente.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeClienteComponent} from '../ce/ce-cliente/ce-cliente.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];

  displayedColumns: string[] = ['id', 'nome', 'fone', 'email', 'actions'];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading = true;

  constructor(
    private ClienteService: ClienteService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.ClienteService.getClientes()
       .subscribe(
        data => {
          this.isLoading = false;
          this.clientes = data;
          // Assign the data to the data source for the table to render
          this.dataSource =  new MatTableDataSource(this.clientes)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 
        error => this.isLoading = false
    )
  }

  ngOnDestroy() {
    this.clientes = null;
  }

  addRowInTable(data){
    this.clientes.push(data[0]);
    this.dataSource._updateChangeSubscription() 
  }
  updateRowInTable(data) {
    let i = this.clientes.findIndex((d) => d.id == data[0].id);
    if (i>=0) {
      this.clientes[i] = data[0] 
    }
    this.dataSource._updateChangeSubscription()
  }
  delRowInTable(id) {
    let i = this.clientes.findIndex((d) => d.id == id);
    if (i>=0) {
      this.clientes.splice(i,1)
    }
    this.dataSource._updateChangeSubscription()
    this.ClienteService.apagar(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(id?:number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
        id: id
    };

    const dialogRef = this.dialog.open(CeClienteComponent,dialogConfig);
    
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
      )
    }
}
