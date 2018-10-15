import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

const rotas: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class LancamentosRoutingModule { }
