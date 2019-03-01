import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relarotioService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  gerarRelatorio() {
    this.relarotioService
      .relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(response => {
        const url = window.URL.createObjectURL(response);
        window.open(url);
      });
  }
}
