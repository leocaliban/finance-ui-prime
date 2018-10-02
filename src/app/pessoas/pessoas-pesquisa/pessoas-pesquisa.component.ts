import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('tabela') tabela;
  filtro = new PessoaFiltro();
  totalRegistros = 0;

  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisarPorNome(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.pessoas = response.pessoas;
      });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.tabela.first = 0;
        this.pesquisar();
        this.mensagemSucesso();

      });
  }

  aoMudarPaginaNaTabela(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  mensagemSucesso() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento excluído.' });
  }

}
