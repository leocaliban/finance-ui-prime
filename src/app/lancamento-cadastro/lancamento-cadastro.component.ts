import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  providers: [MessageService]
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    { label: 'Alimentação', value: '1'},
    { label: 'Transporte', value: '2'}
  ];

  pessoas = [
    { label: 'Aline Silva', value: '1'},
    { label: 'Nina Myers', value: '2'},
    { label: 'Kim Bauer', value: '3'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
