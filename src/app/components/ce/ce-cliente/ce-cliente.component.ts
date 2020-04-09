import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cliente, ClienteService} from 'src/app/services/cliente.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GlobalConstants} from '../../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

@Component({
  selector: 'app-ce-cliente',
  templateUrl: './ce-cliente.component.html',
  styleUrls: ['./ce-cliente.component.css']
})
export class CeClienteComponent implements OnInit {

  cliente: Cliente[]  = [
    {
      id:null,
      nome:null,
      sobrenome:null,
      apelido:null
    }
  ];

  error:any;

  constructor(
    public dialogRef: MatDialogRef<CeClienteComponent>,
    private ClienteService: ClienteService,
    private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/cliente/edit/', formID).subscribe(
          (cliente: Cliente[]) => {
            this.cliente = cliente
          }
        )

      }
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.error = null;
    this.post(this.cliente[0]);
  }
  
  post(value?:any) {
    this.ClienteService
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
