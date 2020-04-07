import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private Token: TokenService
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    this.Jarwis.logout('').subscribe();
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}