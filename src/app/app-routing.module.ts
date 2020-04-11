import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {AgendamentoComponent} from './components/agendamento/agendamento.component'
import {BarbeiroComponent} from './components/barbeiro/barbeiro.component'
import {ClienteComponent} from './components/cliente/cliente.component'

const appRoutes: Routes = [
  {path: '', canActivate:[BeforeLoginService], children: [
    { path : 'login', component: LoginComponent },
    { path : 'signup', component : SignupComponent},
    { path : 'request-password-reset', component: RequestResetComponent },
    { path : 'response-password-reset', component: ResponseResetComponent }
  ]}
  ,
  {path: '', canActivate:[AfterLoginService], children: [
    { path : 'agendamentos', component: AgendamentoComponent },
    { path : 'barbeiros', component : BarbeiroComponent},
    { path : 'clientes', component: ClienteComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    //,RouterModule.forChild(appRoutesChildren)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}