import {Component, OnInit} from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeUsuarioComponent} from '../ce/ce-usuario/ce-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(
    private UsuarioService: UsuarioService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.usuarios    = this.UsuarioService.usuarios;
  }
  ngOnDestroy() {
    this.usuarios = null;
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
          this.UsuarioService.delLinha(result[0].id);
          this.UsuarioService.addLinha(result[0]);
        }
      }
      );
    }

  apagar(id:number) {
    this.UsuarioService.apagar(id);
  }
}
