import {Injectable,NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import {AppRoutingModule} from './/app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule,HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpHeaders} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {AgendamentoService} from './services/agendamento.service';
import {BarbeiroService} from './services/barbeiro.service';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {NavbarComponent} from './components/navbar/navbar.component';

import {JarwisService} from './services/jarwis.service';
import {TokenService} from './services/token.service';
import {AuthService} from './services/auth.service';
import {AfterLoginService} from './services/after-login.service';
import {BeforeLoginService} from './services/before-login.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
//import {MatFormFieldModule} from '@angular/material/form-field';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}

import {AgendamentoComponent} from './components/agendamento/agendamento.component';
import {BarbeiroComponent} from './components/barbeiro/barbeiro.component';
import {ClienteComponent} from './components/cliente/cliente.component';

import {CeAgendamentoComponent} from './components/ce/ce-agendamento/ce-agendamento.component';
import {CeBarbeiroComponent} from './components/ce/ce-barbeiro/ce-barbeiro.component';
import {CeClienteComponent} from './components/ce/ce-cliente/ce-cliente.component';
import { AuthInterceptor } from './auth-interceptor';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CeUsuarioComponent } from './components/ce/ce-usuario/ce-usuario.component';

//import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {OverlayModule} from '@angular/cdk/overlay';


//registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RequestResetComponent,
    ResponseResetComponent,
    NavbarComponent,
    AgendamentoComponent,
    BarbeiroComponent,
    ClienteComponent,
    CeAgendamentoComponent,
    CeBarbeiroComponent,
    CeClienteComponent,
    UsuarioComponent,
    CeUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule,
    SnotifyModule,
    AutocompleteLibModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    AgendamentoService,
    BarbeiroService,
    JarwisService,
    TokenService,
    AuthService, 
    AfterLoginService, 
    BeforeLoginService,
    NavbarComponent,
    [
      {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true,
     },
     ],
    //[{provide: LOCALE_ID, useValue: 'pt-BR'}]
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

