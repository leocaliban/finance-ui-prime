import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let mensagem: string;
    let codigo: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
      codigo = errorResponse.status;
    }

    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: `${mensagem} [${codigo}]` });

  }
}
