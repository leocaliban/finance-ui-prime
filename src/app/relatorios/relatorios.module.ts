import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from 'primeng/components/common/shared';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
