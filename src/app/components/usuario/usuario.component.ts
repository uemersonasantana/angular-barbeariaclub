import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeUsuarioComponent} from '../ce/ce-usuario/ce-usuario.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  displayedColumns: string[] = ['id', 'nome', 'email', 'actions'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading = true;

  constructor(
    private UsuarioService: UsuarioService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.UsuarioService.getUsuarios()
       .subscribe(
        data => {
          this.isLoading = false;
          this.usuarios = data;
          // Assign the data to the data source for the table to render
          this.dataSource =  new MatTableDataSource(this.usuarios)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 
        error => this.isLoading = false
    )
  }
  ngOnDestroy() {
    this.usuarios = null;
  }

  addRowInTable(data){
    this.usuarios.push(data[0]);
    this.dataSource._updateChangeSubscription() 
  }
  updateRowInTable(data) {
    let i = this.usuarios.findIndex((d) => d.id == data[0].id);
    if (i>=0) {
      this.usuarios[i] = data[0] 
    }
    this.dataSource._updateChangeSubscription()
  }
  delRowInTable(id) {
    let i = this.usuarios.findIndex((d) => d.id == id);
    if (i>=0) {
      this.usuarios.splice(i,1)
    }
    this.dataSource._updateChangeSubscription()
    this.UsuarioService.apagar(id);
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

    const dialogRef = this.dialog.open(CeUsuarioComponent,dialogConfig);
    
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

  apagar(id:number) {
    this.UsuarioService.apagar(id);
  }
}
