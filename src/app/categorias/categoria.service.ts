import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { FinanceHttp } from '../seguranca/finance-http';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: FinanceHttp) {
    this.categoriasUrl = `${environment.apiURL}/categorias`;
  }

  pesquisarTodos(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
