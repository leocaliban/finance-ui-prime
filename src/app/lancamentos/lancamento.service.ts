import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

export interface LancamentoFiltro { // Contrato 17.3A
  descricao: string;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const parametros = new URLSearchParams(); // Atribui parâmetros de pesquisas
    const headers = new Headers();

    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM3OTAwNDU1LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI5YzAxOTVkOS04ZWIxLTRjMTItYjQ3Ny0xMGRkM2M5NDc4MTgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.JfkNZ2ExKf1ySV_X-meiQD-vcq0gkQ5G0RbCWTK208Q');

    if (filtro.descricao) { // Se vier alguma informação no filtro
      parametros.set('descricao', filtro.descricao); // Adicine a informação do filtro no valor
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
      { headers, search: parametros })
      .toPromise()
      .then(response => response.json().content);
  }
}
