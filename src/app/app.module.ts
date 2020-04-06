import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AgendamentoService} from './services/agendamento.service';
import {BarbeiroService} from './services/barbeiro.service';

import {AppComponent} from './app.component';

import {AgendamentoComponent} from './components/agendamento/agendamento.component';
import {CeAgendamentoComponent} from './components/ce/agendamento/ce-agendamento.component';

import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {NavbarComponent} from './components/navbar/navbar.component';


import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

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
    CeAgendamentoComponent
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
    MatDialogModule
  ],
  providers: [
    AgendamentoService,
    BarbeiroService,
    JarwisService,
    TokenService,
    AuthService, 
    AfterLoginService, 
    BeforeLoginService,
    //[{provide: LOCALE_ID, useValue: 'pt-BR'}]
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

