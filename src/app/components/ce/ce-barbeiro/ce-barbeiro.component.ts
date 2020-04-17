import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BarbeiroService, Barbeiro} from 'src/app/services/barbeiro.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GlobalConstants} from '../../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

@Component({
  selector: 'app-ce-barbeiro',
  templateUrl: './ce-barbeiro.component.html',
  styleUrls: ['./ce-barbeiro.component.css']
})
export class CeBarbeiroComponent implements OnInit {

  barbeiro: Barbeiro[]  = [
    {
      id:null,
      nome:null,
      fone:null,
      email:null
    }
  ];

  error:any;
  modo:any;

  constructor(
    public dialogRef: MatDialogRef<CeBarbeiroComponent>,
    private BarbeiroService: BarbeiroService,
    private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        this.modo = 'Editar'

        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/barbeiro/edit/', formID).subscribe(
          (barbeiro: Barbeiro[]) => {
            this.barbeiro = barbeiro
          }
        )
      } else {
        this.modo = 'Novo'
      }
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.error = null;
    this.post(this.barbeiro[0]);
  }
  
  post(value?:any) {
    this.BarbeiroService
        .post(value)
        .subscribe(
            barbeiro => {
              this.dialogRef.close(barbeiro);
            },
            error => {
              this.handleError(error)
            }
        );
   }

  handleError(error:any) {
    this.error = '<table>'; 
    for(let e of Object.keys(error.error.errors) ) {
      this.error += "<tr><td><div class='alert alert-danger'>"+error.error.errors[e][0]+"</div></td></tr>";
    }
    this.error += '<table>';
  }
}
