import {Component, OnInit, ViewChild} from '@angular/core';
import {Barbeiro, BarbeiroService} from '../../services/barbeiro.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeBarbeiroComponent} from '../ce/ce-barbeiro/ce-barbeiro.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-barbeiro',
  templateUrl: './barbeiro.component.html',
  styleUrls: ['./barbeiro.component.css']
})
export class BarbeiroComponent implements OnInit {
  barbeiros: Barbeiro[];
  
  displayedColumns: string[] = ['id', 'nome', 'fone', 'email', 'actions'];
  dataSource: MatTableDataSource<Barbeiro>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading = true;

  constructor(
    private BarbeiroService: BarbeiroService
    ,public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.BarbeiroService.getBarbeiros()
       .subscribe(
        data => {
          this.isLoading = false;
          this.barbeiros = data;
          // Assign the data to the data source for the table to render
          this.dataSource =  new MatTableDataSource(this.barbeiros)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 
        error => this.isLoading = false
    )
  }

  ngOnDestroy() {
    this.barbeiros = null;
  }

  addRowInTable(data){
    this.barbeiros.push(data[0]);
    this.dataSource._updateChangeSubscription() 
  }
  updateRowInTable(data) {
    let i = this.barbeiros.findIndex((d) => d.id == data[0].id);
    if (i>=0) {
      this.barbeiros[i] = data[0] 
    }
    this.dataSource._updateChangeSubscription()
  }
  delRowInTable(id) {
    let i = this.barbeiros.findIndex((d) => d.id == id);
    if (i>=0) {
      this.barbeiros.splice(i,1)
    }
    this.dataSource._updateChangeSubscription()
    this.BarbeiroService.apagar(id);
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

    const dialogRef = this.dialog.open(CeBarbeiroComponent,dialogConfig);
    
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