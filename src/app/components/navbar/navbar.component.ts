import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService } from '../../services/token.service';
import {Usuario,UsuarioService} from '../../services/usuario.service';
import {GlobalConstants} from '../../global-constants';

const API_URL:string = GlobalConstants.API_URL;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public loggedIn: boolean;
  collapsed = true;
  
  usuario: Usuario[]  = [
    {
      id:null,
      name:null,
      email:null,
      password:null
    }
  ];

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private UsuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    
    /*if (this.loggedIn) {
      this.me()
    }*/
  }

  me() {
    this.UsuarioService
        .me()
        .subscribe(
            data => {
              this.usuario[0] = data['user']
            })
  }

  logout(event: MouseEvent) {
    this.Jarwis.logout();
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
}