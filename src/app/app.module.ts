import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoaService } from './pessoas/pessoa.service';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    HttpModule,
    ToastModule
  ],
  providers: [LancamentoService, PessoaService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
