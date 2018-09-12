import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    {
      nome: 'Kelly Silva Andrade',
      cidade: 'Maturéia',
      estado: 'PB',
      ativo: true
    },
    {
      nome: 'Amanda Lins',
      cidade: 'João Pessoa',
      estado: 'PB',
      ativo: false
    },
    {
      nome: 'Fabiane Oliveira',
      cidade: 'Recife',
      estado: 'PE',
      ativo: true
    },
    {
      nome: 'Luana Torres',
      cidade: 'Natal',
      estado: 'RN',
      ativo: true
    },
    {
      nome: 'Yanne Lima',
      cidade: 'Patos',
      estado: 'PB',
      ativo: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
