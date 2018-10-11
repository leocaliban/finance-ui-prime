import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/domain/pessoa';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

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
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.mensagemSucesso();
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mensagemSucesso() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'A pessoa foi salva.' });
  }

}
