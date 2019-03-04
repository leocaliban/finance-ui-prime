import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/domain/pessoa';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Contato } from '../../core/domain/contato';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    this.carregarEstados();
    const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(response => {
        this.estados = response.map(estado => ({
          label: estado.nome,
          value: estado.codigo
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.salvar(this.pessoa)
      .then(response => {
        this.mensagemSucesso('A pessoa foi salva.');
        this.router.navigate(['/pessoas', response.codigo]);
      }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.mensagemSucesso('A Pessoa foi alterada.');
        this.pessoa = response;
        this.atualizarTitulo();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then(response => {
      this.pessoa = response;
      this.atualizarTitulo();
    }).catch(erro => this.errorHandler.handle(erro));
  }

  novaPessoa(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  mensagemSucesso(detalhe: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: detalhe });
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  atualizarTitulo() {
    this.title.setTitle(`Editando: ${this.pessoa.nome}`);
  }

}
