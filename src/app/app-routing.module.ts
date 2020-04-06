import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {AgendamentoComponent} from './components/agendamento/agendamento.component'
import {CeAgendamentoComponent} from './components/ce/agendamento/ce-agendamento.component'


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
 },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
 },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
 },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
 }

 ,{
    path: 'agendamentos',
    component: AgendamentoComponent,
    canActivate: [AfterLoginService]
 }
];

/*
const appRoutesChildren: Routes = [
  {
  path:  'agendamentos',
  component:  AgendamentoComponent,
    children: [
      {
      path:  'ce',
      component:  CeAgendamentoComponent
      }
    ]
  }
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    //,RouterModule.forChild(appRoutesChildren)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}