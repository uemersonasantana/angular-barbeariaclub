import { Component, OnInit } from '@angular/core';
import {Cliente, ClienteService} from '../../services/cliente.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeClienteComponent} from '../ce/ce-cliente/ce-cliente.component';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private ClienteService: ClienteService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.clientes    = this.ClienteService.clientes;
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
            this.ClienteService.delLinha(result[0].id);
            this.ClienteService.addLinha(result[0]);
        }
      }
      );
    }

  apagar(id:number) {
    this.ClienteService.apagar(id);
  }
}
