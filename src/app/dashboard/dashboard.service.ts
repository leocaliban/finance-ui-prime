import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';
import { FinanceHttp } from '../seguranca/finance-http';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: FinanceHttp
  ) {
    this.lancamentosUrl = `${environment.apiURL}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-categoria`)
      .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.convertStringToDate(dados);
        return dados;
      });
  }

  private convertStringToDate(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
