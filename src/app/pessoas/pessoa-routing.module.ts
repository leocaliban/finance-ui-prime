import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const rotas: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'novo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: ':codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
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
export class PessoaRoutingModule { }
