import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date(2017, 6, 30),
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria Pão Novo'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Aluguel',
      dataVencimento: new Date(2018, 3, 11),
      dataPagamento: new Date(2018, 3, 11),
      valor: 220.00,
      pessoa: 'Jack Bauer'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Água',
      dataVencimento: new Date(2018, 5, 11),
      dataPagamento: null,
      valor: 100.00,
      pessoa: 'James Lancer'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Salário',
      dataVencimento: new Date(2018, 9, 11),
      dataPagamento: new Date(2018, 6, 19),
      valor: 990.00,
      pessoa: 'Rafael Lima'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Cervejas',
      dataVencimento: new Date(2018, 5, 4),
      dataPagamento: new Date(2018, 5, 4),
      valor: 90000.00,
      pessoa: 'Zeca'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }

}
