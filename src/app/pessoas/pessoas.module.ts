
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';


@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule,
    ButtonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    SelectButtonModule,
    TableModule,
    TooltipModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    PessoaRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent
  ],
  exports: []
})
export class PessoasModule { }
