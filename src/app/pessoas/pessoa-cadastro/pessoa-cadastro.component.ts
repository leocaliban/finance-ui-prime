import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/domain/pessoa';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.mensagemSucesso('A pessoa foi salva.');
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.mensagemSucesso('A Pessoa foi alterada.');
        this.pessoa = response;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then(response => {
      this.pessoa = response;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  mensagemSucesso(detalhe: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: detalhe });
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

}
