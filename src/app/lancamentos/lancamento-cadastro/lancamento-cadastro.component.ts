import { Lancamento } from './../../core/domain/lancamento';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.carregarFormulario();
    this.title.setTitle('Novo Lançamento');
    this.carregarCategorias();
    this.carregarPessoas();
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }
  antesUploadAnexo(event: any) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  carregarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricao: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(5)]],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      valor: [null, Validators.required],
      observacao: [],
      tipo: ['RECEITA', Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      })
    });
  }

  validarCampoObrigatorio(input: FormControl) {
    // Para acessar um outro input do form
    // input.root.get('dataVencimento').value
    return (input.value ? null : { campoObrigatorio: true });
  }

  validarTamanhoMinimo(quantidadeDeCaracteres: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= quantidadeDeCaracteres) ? null : { tamanhoMinimo: { tamanho: quantidadeDeCaracteres } };
    };
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.salvar(this.formulario.value)
      .then(response => {
        this.mensagemSucesso('O Lançamento foi salvo.');
        this.router.navigate(['/lancamentos', response.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(response => {
        this.mensagemSucesso('O Lançamento foi alterado.');
        this.formulario.patchValue(response);
        this.atualizarTitulo();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).then(response => {
      this.formulario.patchValue(response);
      this.atualizarTitulo();
    })
      .catch(erro => this.errorHandler.handle(erro));
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

  novoLancamento() {
    this.formulario.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();

    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  mensagemSucesso(detalhe: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: detalhe });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  atualizarTitulo() {
    this.title.setTitle(`Editando: ${this.formulario.get('descricao').value}`);
  }
}
