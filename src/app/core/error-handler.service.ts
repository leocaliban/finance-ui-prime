import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let erros;
      mensagem = 'Ocorreu um erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        mensagem = 'Desculpe, você não possui permissões para realizar essa ação.';
      }
      try {
        erros = errorResponse.json();
        mensagem = erros[0].mensagemUsuario;
      } catch (error) {
        console.error('Ocorreu um erro.', errorResponse);
      }
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
      console.error('Ocorreu um erro.', errorResponse._body);
    }

    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: `${mensagem}` });

  }
}
