import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

lancamentos = [
  {
    tipo: 'DESPESA',
    descricao: 'Compra de pão',
    dataVencimento: '30/06/2017',
    dataPagamento: null,
    valor: 4.55,
    pessoa: 'Padaria Pão Novo'
  },
  {
    tipo: 'RECEITA',
    descricao: 'Aluguel',
    dataVencimento: '11/03/2018',
    dataPagamento: '11/03/2018',
    valor: 220.00,
    pessoa: 'Jack Bauer'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Conta de Água',
    dataVencimento: '11/05/2018',
    dataPagamento: null,
    valor: 100.00,
    pessoa: 'James Lancer'
  },
  {
    tipo: 'RECEITA',
    descricao: 'Salário',
    dataVencimento: '11/09/2018',
    dataPagamento: '11/09/2018',
    valor: 990.00,
    pessoa: 'Rafael Lima'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Cervejas',
    dataVencimento: '05/04/2018',
    dataPagamento: '05/04/2018',
    valor: 90.00,
    pessoa: 'Zeca'
  }
];
}
