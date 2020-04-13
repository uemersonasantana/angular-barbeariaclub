import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario, UsuarioService} from '../../../services/usuario.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GlobalConstants} from '../../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

@Component({
  selector: 'app-ce-usuario',
  templateUrl: './ce-usuario.component.html',
  styleUrls: ['./ce-usuario.component.css']
})
export class CeUsuarioComponent implements OnInit {

  usuario: Usuario[]  = [
    {
      id:null,
      name:null,
      email:null,
      password:null
    }
  ];

  public form = {
    editPassword: null,
    password_confirmation: null
  };

  error:any;

  constructor(
    public dialogRef: MatDialogRef<CeUsuarioComponent>,
    private UsuarioService: UsuarioService,
    private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data.id != null ) {
        let formID = {
          id:data.id
        }
        this._http.post(API_URL + '/usuario/edit/', formID).subscribe(
          (usuario: Usuario[]) => {
            this.usuario = usuario
          }
        )

      } else {
        this.form.editPassword = true
      }
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.error = null;

    this.usuario[0]['editPassword'] = this.form['editPassword'];
    this.usuario[0]['password_confirmation'] = this.form['password_confirmation'];
    this.post(this.usuario[0]);
  }
  
  post(value?:any) {
    this.UsuarioService
        .post(value)
        .subscribe(
            data => {
              this.dialogRef.close(data);
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
