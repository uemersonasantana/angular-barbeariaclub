import {Component, OnInit} from '@angular/core';
import {Barbeiro, BarbeiroService} from '../../services/barbeiro.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CeBarbeiroComponent} from '../ce/ce-barbeiro/ce-barbeiro.component';

@Component({
  selector: 'app-barbeiro',
  templateUrl: './barbeiro.component.html',
  styleUrls: ['./barbeiro.component.css']
})
export class BarbeiroComponent implements OnInit {

  barbeiros: Barbeiro[];

  constructor(
    private BarbeiroService: BarbeiroService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.barbeiros    = this.BarbeiroService.barbeiros;
  }

  ngOnDestroy() {
    this.barbeiros = null;
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
          this.BarbeiroService.delLinha(result[0].id);
          this.BarbeiroService.addLinha(result[0]);
        }
      }
      );
    }

  apagar(id:number) {
    this.BarbeiroService.apagar(id);
  }
}
