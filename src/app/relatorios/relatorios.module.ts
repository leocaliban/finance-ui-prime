import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { CompartilhadoModule } from '../compartilhado/compartilhado.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    CompartilhadoModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
