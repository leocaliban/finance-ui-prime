import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { FinanceHttp } from '../seguranca/finance-http';


@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(
    private http: FinanceHttp
  ) {
    this.lancamentosUrl = `${environment.apiURL}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams({
      fromObject: {
        inicio: moment(inicio).format('YYYY-MM-DD'),
        fim: moment(fim).format('YYYY-MM-DD')
      }
    });

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      {
        params,
        responseType: 'blob'
      })
      .toPromise();
  }

}
