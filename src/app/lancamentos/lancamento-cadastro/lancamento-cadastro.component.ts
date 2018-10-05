import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  providers: [MessageService]
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodos()
      .then(response => {
        this.categorias = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      })
      // this.categorias = response.map(c => ({label:c.nome, value: c.codigo}))
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodos()
      .then(response => {
        this.pessoas = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
