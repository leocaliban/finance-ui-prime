import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

export class PessoaFiltro { // Contrato 17.3A
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisarPorNome(filtro: PessoaFiltro): Promise<any> {
    const parametros = new URLSearchParams();
    const headers = new Headers();

    this.adicionarAuthorization(headers);

    parametros.set('page', filtro.pagina.toString());
    parametros.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      parametros.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, search: parametros })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas: pessoas,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }

  pesquisarTodos(): Promise<any> {
    const headers = new Headers();

    this.adicionarAuthorization(headers);

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }


  adicionarAuthorization(headers: Headers) {
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM4MTc2Mzk2LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJhYzU2YTlkMC0zNjhlLTRmOWUtOTY3Yi0zY2I3MzY5ZTc3NzUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.SaGASQwDoqWJG8_wuw2IefDsYKQsa0KxuQVDhndtQl8');
  }
}
