import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../core/domain/lancamento';
import { environment } from './../../environments/environment';
import { FinanceHttp } from '../seguranca/finance-http';

export class LancamentoFiltro { // Contrato 17.3A
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: FinanceHttp) {
    this.lancamentosUrl = `${environment.apiURL}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;
        this.converterStringsParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
      });
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let parametros = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      parametros = parametros.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      parametros = parametros.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      parametros = parametros.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params: parametros })
      .toPromise()
      .then(response => {
        const lancamentos = response.content;

        const resultado = {
          lancamentos: lancamentos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}

