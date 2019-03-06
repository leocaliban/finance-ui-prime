import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/domain/pessoa';
import { environment } from '../../environments/environment';
import { Estado } from '../core/domain/estado';
import { Cidade } from '../core/domain/cidade';
import { FinanceHttp } from '../seguranca/finance-http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: FinanceHttp) {
    this.pessoasUrl = `${environment.apiURL}/pessoas`;
    this.cidadesUrl = `${environment.apiURL}/cidades`;
    this.estadosUrl = `${environment.apiURL}/estados`;
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  pesquisarPorNome(filtro: PessoaFiltro): Promise<any> {
    let parametros = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      parametros = parametros.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, { params: parametros })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas: pessoas,
          total: response.totalElements
        };
        return resultado;
      });
  }

  pesquisarTodos(): Promise<any> {
    return this.http.get<any>(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo).toPromise().then(() => null);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const parametros = new HttpParams()
      .append('estado', estado);
    return this.http.get<Cidade[]>(this.cidadesUrl, { params: parametros })
      .toPromise();
  }
}
