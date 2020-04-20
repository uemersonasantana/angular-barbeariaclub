import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  
  public loggedIn: boolean;

  constructor(
    private Auth: AuthService,
    private router: Router
  ) {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    
    if (this.loggedIn) {
      this.router.navigateByUrl('/agendamentos');
    } 

  }
  
}
