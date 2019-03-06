import { CategoriaService } from './../categorias/categoria.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';
import { FinanceHttp } from '../seguranca/finance-http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    MessageService,
    CategoriaService,
    AuthService,
    ConfirmationService,
    DashboardService,
    RelatoriosService,
    Title,
    JwtHelperService,
    FinanceHttp,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
