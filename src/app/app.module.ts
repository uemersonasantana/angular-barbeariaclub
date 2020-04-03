import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';

import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { NovoAgendamentoComponent } from './components/novo-agendamento/novo-agendamento.component';

import { AgendamentoService } from './services/agendamento.service';
import { BarbeiroService } from './services/barbeiro.service';

import { TimePickerComponent } from './components/time-picker/time-picker.component';
import {OverlayModule} from '@angular/cdk/overlay';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

/*const routes: Routes = [
  { path: '', component: AgendamentoComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];*/

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AgendamentoComponent,
    NovoAgendamentoComponent,
    TimePickerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    //RouterModule.forRoot(routes),
    
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,

    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule,

    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  entryComponents: [
    NovoAgendamentoComponent,
    TimePickerComponent
  ],
  providers: [
    AgendamentoService,
    BarbeiroService,
    [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

